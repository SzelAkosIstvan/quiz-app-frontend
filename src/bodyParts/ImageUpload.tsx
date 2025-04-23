import React, {useState} from "react";
import '../styleSheets/questionStyle.css'

const ImageUpload = () => {
    const [url, setUrl] = useState("");

    const onChange = (e:any) => {
        const files = e.target.files;
        files.length && setUrl(URL.createObjectURL(files[0]));
    }

    return (
        <>
            <div className={`image-upload ${url && "with-image"}`}>
                {url ? (
                    <img className="image-view" src={url} alt="" onClick={() => setUrl("")}/>
                ) : (
                    <div className="upload-container">
                        <input type="file" onChange={onChange} className="upload-image" accept=".jpg,.png,.jpeg, .gif" />
                    </div>
                )}
            </div>
        </>
    );
};

export default ImageUpload;