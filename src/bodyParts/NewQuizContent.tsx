import React, { useState, useEffect } from "react";
import OpenQuestion from "./OpenQuestion";
import ClosedQuestion from "./ClosedQuestion";
import QuestionAddButtons from "./QuestionAddButtons";

interface Question {
    type: 'open' | 'closed';
    question: string;
    possibleAns: string[];
    correctAnswer: string;
}

const NewQuizContent: React.FC = () => {
    // Load questions from local storage on component mount
    const [questions, setQuestions] = useState<Question[]>(() => {
        const savedQuestions = localStorage.getItem('questions');
        return savedQuestions ? JSON.parse(savedQuestions) : [];
    });

    // Save questions to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);

    const addOpenQuestion = () => {
        setQuestions([...questions, { type: 'open', question: '', possibleAns: [], correctAnswer: '' }]);
    };

    const addClosedQuestion = () => {
        setQuestions([...questions, { type: 'closed', question: '', possibleAns: ['', '', '', ''], correctAnswer: '' }]);
    };

    const setNewQuestion = (index: number, newQuestion: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = newQuestion;
        setQuestions(updatedQuestions);
    }

    const setCorrectAns = (index: number, correctAns: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctAnswer = correctAns;
        setQuestions(updatedQuestions);
    }

    const setPossibleAns = (index: number, ansIndex: number, correctAns: string) => {
        const updatedQuestions = [...questions];
        if (!updatedQuestions[index].possibleAns) {
            updatedQuestions[index].possibleAns = [];
        }
        updatedQuestions[index].possibleAns[ansIndex] = correctAns;
        setQuestions(updatedQuestions);
    }

    return (
        <div className="new-quiz-body">
            {questions.map((question, index) => (
                <div key={index}>
                    {question.type === 'open' ? (
                        <OpenQuestion
                            question={question.question}
                            possibleAns={question.correctAnswer}
                            setQuestion={(newQuestion) => {setNewQuestion(index, newQuestion)}}
                            setAnswer={(correctAns) => {setCorrectAns(index, correctAns)}}
                        />
                    ) : (
                        <ClosedQuestion
                            question={question.question}
                            possibleAns={question.possibleAns}
                            setQuestion={(newQuestion) => {setNewQuestion(index, newQuestion)}}
                            setAnswer={(ansIndex, possibleAns) => {setPossibleAns(index, ansIndex, possibleAns)}}
                        />
                    )}
                </div>
            ))}
            <QuestionAddButtons
                addOpenQuestion={addOpenQuestion}
                addClosedQuestion={addClosedQuestion}
            />
        </div>
    );
};

export default NewQuizContent;