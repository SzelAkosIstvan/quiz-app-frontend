import React from "react";
import QuizQuestion from "../bodyParts/QuizQuestion";
import WaitScreen from "../bodyParts/WaitScreen";

type playQuizProps = {
    question: any | null;
    answers: string[];
    correctAnswer: string | null;
    imageUrl: string | null;
}

const PlayQuizGame = ({question, answers, correctAnswer, imageUrl}: playQuizProps) => {
    return (
        <>
            { !question ? (
                <WaitScreen message="Wait for others to join"/>
            ) : (
                <QuizQuestion
                    questionString={question}
                    possibleAnswers={answers}
                    imageUrl={imageUrl}
                />
            )}
        </>
    );
};

export default PlayQuizGame;