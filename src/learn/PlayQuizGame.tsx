import React from "react";
import QuizQuestion from "../bodyParts/QuizQuestion";
import WaitScreen from "../bodyParts/WaitScreen";

type playQuizProps = {
    question: any | null;
    answers: string[];
    correctAnswer: string | null;
    imageUrl: string | null;
    handleOptionSelect: (option: string) => void;
    selected?: boolean;
}

const PlayQuizGame = ({question, answers, correctAnswer, imageUrl, handleOptionSelect, selected}: playQuizProps) => {
    return (
        <>
            { !question ? (
                <WaitScreen message="Wait for others to join"/>
            ) : (
                <QuizQuestion
                    questionString={question}
                    possibleAnswers={answers}
                    imageUrl={imageUrl}
                    handleOptionSelect={handleOptionSelect}
                    selected={selected}
                    correctAnswer={correctAnswer === null ? null : correctAnswer}
                />
            )}
        </>
    );
};

export default PlayQuizGame;