import React from "react";

interface QuestionAddButtonsProps {
    addOpenQuestion: () => void;
    addClosedQuestion: () => void;
}

const QuestionAddButtons: React.FC<QuestionAddButtonsProps> = ({ addOpenQuestion, addClosedQuestion }) => {
    return (
        <div className="quiz-buttons">
            <button className="add-new-question" onClick={addOpenQuestion}>Add Open-ended question</button>
            <button className="add-new-question" onClick={addClosedQuestion}>Add Closed-ended question</button>
        </div>
    );
}

export default QuestionAddButtons;