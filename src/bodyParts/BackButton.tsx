import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import '../styleSheets/questionStyle.css';
import {useLocation, useNavigate} from "react-router-dom";
import {handleLogout} from "../styleSheets/userData";

type BackProps = {
    icon: IconDefinition;
    text: string;
}

const BackButton = ({icon, text}: BackProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === "/") {
            handleLogout();
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    return (
        <button className="back-button" onClick={handleClick}>
            <FontAwesomeIcon icon={icon} className="back-button-icon" />
            <h1>{text}</h1>
        </button>
    );
};

export default BackButton;