import React, { useRef } from "react";

interface QuizCodeInputProps {
    quizCode: string[];
    setQuizCode: (quizCode: string[]) => void;
}

const QuizCodeInput: React.FC<QuizCodeInputProps> = ({ quizCode, setQuizCode }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Ensure inputRefs.current always has 8 elements
    if (inputRefs.current.length !== 8) {
        inputRefs.current = Array(8).fill(null);
    }

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        const newQuizCode = [...quizCode];
        newQuizCode[index] = value;
        setQuizCode(newQuizCode);

        // Move focus to the next input if a digit is entered
        if (value && index < 7) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace/delete
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !quizCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="quiz-code-input">
            {quizCode.map((digit, index) => (
                <React.Fragment key={index}>
                <input
                    className="quiz-input"
                    key={index}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                />
                    {index === 3 && <h2>-</h2>}
                </React.Fragment>
            ))}
        </div>
    );
};

export default QuizCodeInput;