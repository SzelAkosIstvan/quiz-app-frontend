import React, {useState} from "react";
import '../styleSheets/questionStyle.css'

interface QuestionProps {
    question: string;
    visualUrl?: string | null;
}

const Question: React.FC<QuestionProps> = ({question, visualUrl}) => {
    return (
        <div className="question">
            <h1>{question}</h1>
            {visualUrl && (
                <div className="imgContainer">
                    <img src={visualUrl} alt="Question related" />
                </div>
            )}
        </div>
    );
};

export default Question;