import React from "react";
import ImageUpload from "./ImageUpload";

interface OpenQuestionProps {
    question: string;
    possibleAns: string;
    imageURL: string|null;
    setQuestion: (question: string) => void;
    setAnswer: (answers: string) => void;
    setImage: (image: string | null) => void;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({question, possibleAns = "", imageURL = null, setQuestion, setAnswer, setImage}) => {

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
            <ImageUpload url={imageURL} setUrl={setImage}/>
        </div>
    );
};

export default OpenQuestion;