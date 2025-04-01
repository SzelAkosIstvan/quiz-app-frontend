import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
    title: string;
    setTitle: (input: string) => void;
    save: () => void;
}

const WorkHeader = ({title, setTitle, save}: HeaderProps) => {
    const [changed, wasChanged] = useState<boolean>(false);

    const changeTitle = () => {
        if (!changed) {
            setTitle("");
        }
    }

    return (
        <div className="header">
            <img alt="VDU logo" />
            <input type="text"
                   className="title-input"
                   value={title}
                   onChange={(e) => {
                       setTitle(e.target.value);
                       wasChanged(true)
                   }}
                   onClick={changeTitle}
            />
            <button className="upload-button" onClick={save}>
                <FontAwesomeIcon icon={faCloudArrowUp} className="upload-button-icon" />
            </button>
        </div>
    );
};

export default WorkHeader;