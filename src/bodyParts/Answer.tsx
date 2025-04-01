import React from "react";
import '../styleSheets/questionStyle.css';

interface AnswerProps {
    answer: string;
    onClick?: () => void;
    isSelected: boolean;
    isCorrect: boolean;
}

const Answer: React.FC<AnswerProps> = ({answer, onClick, isSelected, isCorrect}: AnswerProps) => {
    return (
        <button className={`answer ${isSelected ? (isCorrect ? "correct" : "incorrect") : ""}`} onClick={onClick}>
            <h2>{answer}</h2>
        </button>
    );
};

export default Answer;