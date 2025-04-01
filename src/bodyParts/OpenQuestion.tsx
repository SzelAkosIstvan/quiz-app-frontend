import React from "react";
import ImageUpload from "./ImageUpload";

interface OpenQuestionProps {
    question: string;
    possibleAns: string;
    setQuestion: (question: string) => void;
    setAnswer: (answers: string) => void;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({question, possibleAns = "", setQuestion, setAnswer}) => {

    return (
        <div className="new-question">
            <div className="question-answer-container">
                <input
                    type="text"
                    className="new-question-title"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    placeholder="Enter your question"
                />
                <input
                    type="new-question-answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={possibleAns}
                    placeholder={`Correct answer`}
                />
            </div>
            <ImageUpload />
        </div>
    );
};

export default OpenQuestion;