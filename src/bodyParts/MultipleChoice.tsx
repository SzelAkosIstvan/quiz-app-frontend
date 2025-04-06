import React from "react";
import '../styleSheets/questionStyle.css';
import Answer from "./Answer";

interface MultipleChoiceProps {
    possibleAnswers: string[];
    onSelect: (selectedOption: string) => void;
    selectedOption: string | null;
    correctOption?: string | null;
    selected?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({possibleAnswers, onSelect, selectedOption, correctOption, selected}: MultipleChoiceProps) => {

    return (
        <div className="multiple-choice">
            {possibleAnswers.map((answer, index) => (
                <Answer
                    key={index}
                    answer={answer}
                    onClick={() => onSelect(answer)}
                    isSelected={selectedOption === answer}//logic???
                    isCorrect={correctOption === null ? null : answer === correctOption}
                    clicked={selected}
                />
            ))}
        </div>
    );
};

export default MultipleChoice;