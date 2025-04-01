import React from "react";
import Question from "./Question";
import MultipleChoice from "./MultipleChoice";
import GuessTheAnswer from "./GuessTheAnswer";
import HeaderW from "./HeaderW";
import TimeRemaining from "./TimeRemaining";

type quizQuestionProps = {
    questionString: string;
    possibleAnswers: string[];
}

let result = 'a';

const handleOptionSelect = (option: string) => {
    if(option.length>0 && option[0] === result)
    {
        console.log("Gratulálok te bolond");
    }
};

const quizQuestion = ({questionString, possibleAnswers}: quizQuestionProps) => {
    return (
        <>
            <HeaderW />
            <Question question={questionString} visualUrl={"https://i0.wp.com/i0.kym-cdn.com/photos/images/original/000/495/314/e2b.png?w=640"} />
            {possibleAnswers.length > 1 && (
                <>
                    <MultipleChoice possibleAnswers={possibleAnswers} onSelect={handleOptionSelect} selectedOption={null} correctOption={null}/>
                </>
            )}
            {possibleAnswers.length === 0 && (
                <>
                    <GuessTheAnswer />
                </>
            )}
            <TimeRemaining/>
        </>
    );
};

export default quizQuestion;