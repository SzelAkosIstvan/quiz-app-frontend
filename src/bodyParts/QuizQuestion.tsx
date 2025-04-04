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
}

let result = 'a';

const handleOptionSelect = (option: string) => {
    if(option.length>0 && option[0] === result)
    {
        console.log("Gratulálok te bolond");
    }
};

const QuizQuestion = ({questionString, possibleAnswers, imageUrl}: quizQuestionProps) => {
    return (
        <>
            <HeaderW />
            <Question question={questionString} visualUrl={imageUrl} />
            {possibleAnswers.length > 1 && (
                <>
                    <MultipleChoice possibleAnswers={possibleAnswers} onSelect={handleOptionSelect} selectedOption={null} correctOption={null}/>
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