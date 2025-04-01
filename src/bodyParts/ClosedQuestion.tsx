import React from "react";
import ImageUpload from "./ImageUpload";

interface CloedQuestionProps {
    question: string;
    possibleAns?: string[];
    setQuestion: (question: string) => void;
    setAnswer: (ansIndex: number, answers: string) => void;
}

const ClosedQuestion: React.FC<CloedQuestionProps> = ({question, possibleAns = ['', '', '', ''], setQuestion, setAnswer}: CloedQuestionProps) => {
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
                <div className="asd">
                    {possibleAns.map((answer, index) => (
                        <input
                            key={index}
                            type="new-question-answer"
                            onChange={(e) => setAnswer(index, e.target.value)}
                            value={answer}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            <ImageUpload />
        </div>
    );
};

export default ClosedQuestion;