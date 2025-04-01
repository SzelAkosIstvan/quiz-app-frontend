import React from "react";
import '../styleSheets/questionStyle.css';
import Answer from "./Answer";

interface MultipleChoiceProps {
    possibleAnswers: string[];
    onSelect: (selectedOption: string) => void;
    selectedOption: string | null;
    correctOption: string | null;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({possibleAnswers, onSelect, selectedOption, correctOption}: MultipleChoiceProps) => {

    return (
        <div className="multiple-choice">
            {possibleAnswers.map((answer, index) => (
                <Answer
                    key={index}
                    answer={answer}
                    onClick={() => onSelect(answer)}
                    isSelected={selectedOption === answer}
                    isCorrect={answer[0] === correctOption}
                />
            ))}
        </div>
    );
};

export default MultipleChoice;