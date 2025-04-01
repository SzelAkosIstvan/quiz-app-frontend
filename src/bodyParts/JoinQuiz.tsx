import React, {useState} from "react";
import QuizCodeInput from "./quizCodeInput";
import StartQuiz from "../styleSheets/StartQuiz";
import '../styleSheets/questionStyle.css'

interface JoinQuizProps {
    quizCode: string[];
    setQuizCode: React.Dispatch<React.SetStateAction<string[]>>;
    start: () => void;
}

const JoinQuiz = ({ quizCode, setQuizCode, start }: JoinQuizProps) => {
    return (
        <div className="join-code">
            <h1>Insert code below</h1>
            <h4>Just look up to the whiteboard ;D</h4>
            <QuizCodeInput quizCode={quizCode} setQuizCode={setQuizCode} />
            <button onClick={start}>Csatlakozás</button>
        </div>
    );
};

export default JoinQuiz;