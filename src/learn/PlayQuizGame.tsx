import React from "react";
import QuizQuestion from "../bodyParts/QuizQuestion";
import WaitScreen from "../bodyParts/WaitScreen";

type playQuizProps = {
    question: any[] | null;
    answers: string[] | null;
    correctAnswer: string | null;
}

const playQuizGame = ({question, answers, correctAnswer}: playQuizProps) => {
    return (
        <>
            { !question ? (
                <WaitScreen message="Wait for others to join"/>
            ) : (
                <QuizQuestion
                    questionString={"question"}
                    possibleAnswers={["egy","ketto","harom","negy"]}
                />)}

        </>
    );
};

export default playQuizGame;