import React, {useEffect, useState} from "react";
import '../styleSheets/questionStyle.css';

interface AnswerProps {
    answer: string;
    onClick?: () => void;
    isSelected: boolean;
    isCorrect: boolean | null;
    clicked?: boolean;
}

const Answer: React.FC<AnswerProps> = ({answer, onClick, isSelected, isCorrect, clicked}: AnswerProps) => {
    const [slcted, setSlcted] = useState<boolean>(isSelected);

    const click = () => {
        onClick?.();
        setSlcted(true);
    }

    useEffect(() => {
        if(!clicked) {
            setSlcted(false);
        }
    }, [clicked]);

    useEffect(() => {
        setSlcted(false);
    }, [answer]);

    return (
        <button className={`answer ${slcted ? "selected" : ""} ${slcted ? (isCorrect === null ? ("") : (isCorrect ? "correct" : "incorrect")) : ""}`}
                onClick={click}
                disabled={clicked}
        >
            <h2>{answer}</h2>
        </button>
    );
};

export default Answer;