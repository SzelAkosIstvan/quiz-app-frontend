import React, { useState, useEffect } from "react";
import OpenQuestion from "./OpenQuestion";
import ClosedQuestion from "./ClosedQuestion";
import QuestionAddButtons from "./QuestionAddButtons";

interface Question {
    type: 'open' | 'closed';
    question: string;
    possibleAns: string[];
    correctAnswer: string;
    questionImage: string|null;
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
        setQuestions([...questions, { type: 'open', question: '', possibleAns: [], correctAnswer: '', questionImage: null }]);
    };

    const addClosedQuestion = () => {
        setQuestions([...questions, { type: 'closed', question: '', possibleAns: ['', '', '', ''], correctAnswer: '', questionImage: null }]);
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

    const setQuestionImage = (index: number, questionImg: string|null) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionImage = questionImg;
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
                            imageURL={question.questionImage}
                            setQuestion={(newQuestion) => {setNewQuestion(index, newQuestion)}}
                            setAnswer={(correctAns) => {setPossibleAns(index, 0, correctAns); setCorrectAns(index, correctAns)}}
                            setImage={(newImage) => {setQuestionImage(index, newImage)}}
                        />
                    ) : (
                        <ClosedQuestion
                            question={question.question}
                            possibleAns={question.possibleAns}
                            imageURL={question.questionImage}
                            setQuestion={(newQuestion) => {setNewQuestion(index, newQuestion)}}
                            setAnswer={(ansIndex, possibleAns) => {setPossibleAns(index, ansIndex, possibleAns)}}
                            setCorrectAns={(correctAns) => {setCorrectAns(index, correctAns)}}
                            correctAnsIndex={question.possibleAns.indexOf(question.correctAnswer)}
                            setImage={(newImage) => {setQuestionImage(index, newImage)}}
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