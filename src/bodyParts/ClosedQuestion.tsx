import React from "react";
import ImageUpload from "./ImageUpload";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface CloedQuestionProps {
    question: string;
    possibleAns?: string[];
    setQuestion: (question: string) => void;
    setAnswer: (ansIndex: number, answers: string) => void;
    setCorrectAns: (correctAns: string) => void;
    correctAnsIndex: number;
}

const ClosedQuestion: React.FC<CloedQuestionProps> = ({question, possibleAns = ['', '', '', ''], setQuestion, setAnswer, setCorrectAns, correctAnsIndex}: CloedQuestionProps) => {
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
                        <div className="asdd" key={index}>
                            <input
                                key={index}
                                type="new-question-answer"
                                onChange={(e) => setAnswer(index, e.target.value)}
                                value={answer}
                                placeholder={`Option ${index + 1}`}
                            />
                            <button
                                type="button"
                                className="set-as-correct"
                                onClick={() => setCorrectAns(answer)}
                                id={(index === correctAnsIndex)? "correct-answer" : ""}
                            >
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ImageUpload />
        </div>
    );
};

export default ClosedQuestion;