import React from "react";
import Question from "./Question";
import MultipleChoice from "./MultipleChoice";
import GuessTheAnswer from "./GuessTheAnswer";
import HeaderW from "./HeaderW";
import TimeRemaining from "./TimeRemaining";

type quizQuestionProps = {
    questionString: string;
    possibleAnswers: string[];
    imageUrl?: string | null;
    handleOptionSelect: (option: string) => void;
    selected?: boolean;
    correctAnswer?: string | null;
}

const QuizQuestion = ({questionString, possibleAnswers, imageUrl, handleOptionSelect, selected, correctAnswer}: quizQuestionProps) => {
    return (
        <>
            <HeaderW />
            <Question question={questionString} visualUrl={imageUrl} />
            {possibleAnswers.length > 1 && (
                <>
                    <MultipleChoice
                        possibleAnswers={possibleAnswers}
                        onSelect={handleOptionSelect}
                        selectedOption={null}
                        correctOption={correctAnswer === null ? null : correctAnswer}
                        selected={selected} />
                    <TimeRemaining/>
                </>
            )}
            {possibleAnswers.length === 1 && (
                <>
                    <GuessTheAnswer />
                    <TimeRemaining/>
                </>
            )}
        </>
    );
};

export default QuizQuestion;