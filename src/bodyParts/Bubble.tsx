import React from "react";
import {useNavigate} from "react-router-dom";
import '../styleSheets/questionStyle.css'

type BubbleProps = {
    background: string;
    content: string | null;
    linkTo: string;
    text: string | null;
};

const Bubble = ({ background, content, linkTo, text }: BubbleProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${linkTo}`)
    }

    return (
        <div className="bubble" style={{ backgroundColor: `${background}`}} onClick={handleClick}>
            {content && <img src={content} alt="bubble-content" />}
            <h1>{text}</h1>
        </div>
    );
};

export default Bubble;