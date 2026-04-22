import React, { useId } from "react";
import '../styleSheets/questionStyle.css'

interface ImageUploadProps {
    url: string|null;
    setUrl: (imgUrl: string | null) => void;
}

const ImageUpload = ({url, setUrl}: ImageUploadProps) => {
    const inputId = useId();

    const saveImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setUrl(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            saveImage(files[0]);
        }
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            saveImage(e.dataTransfer.files[0]);
        }
    };

    return (
        <>
            <div
                className={`image-upload ${url ? "with-image" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={url ? () => setUrl(null) : undefined}
            >
                {url ? (
                    <img className="image-view" src={url} alt="Uploaded question"/>
                ) : (
                    <label className="upload-container" htmlFor={inputId}>
                        <span className="upload-label-text">Drop image here or click to upload</span>
                        <input
                            id={inputId}
                            type="file"
                            onChange={(e) => {
                                onChange(e);
                                e.target.value = "";
                            }}
                            className="upload-image"
                            accept=".jpg,.png,.jpeg,.gif"
                        />
                    </label>
                )}
            </div>
        </>
    );
};

export default ImageUpload;