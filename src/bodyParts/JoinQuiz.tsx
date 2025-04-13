import React, {useEffect} from "react";
import QuizCodeInput from "./quizCodeInput";
import '../styleSheets/questionStyle.css'

interface JoinQuizProps {
    quizCode: string[];
    setQuizCode: React.Dispatch<React.SetStateAction<string[]>>;
    start: () => void;
}

const JoinQuiz = ({ quizCode, setQuizCode, start }: JoinQuizProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                start();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [start]);

    return (
        <div className="join-code">
            <h1>Insert code below</h1>
            <h4>Just look up to the whiteboard ;D</h4>
            <QuizCodeInput quizCode={quizCode} setQuizCode={setQuizCode} />
        </div>
    );
};

export default JoinQuiz;