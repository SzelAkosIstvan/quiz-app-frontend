import React, {useEffect, useState} from "react";
import WorkHeader from "../bodyParts/WorkHeader";
import NewQuizContent from "../bodyParts/NewQuizContent";

interface Question {
    type: string;
    question: string;
    possibleAns: string[];
    correctAnswer: string;
}

interface QuizData {
    title: string;
    questions: Question[];
}

const CreateNewQuiz = () => {
    const [quizTitle, setQuizTitle] = useState(() => {
        const savedTitle = localStorage.getItem('quizTitle');
        return savedTitle || "Quiz title";
    });
    const getQuestionsFromStorage = (): Question[] => {
        try {
            const savedQuestions = localStorage.getItem('questions');
            if (!savedQuestions) return [];

            const rawQuestions = JSON.parse(savedQuestions);
            return rawQuestions.map((q: any) => ({
                type: q.type || "closed",
                question: q.question || "",
                possibleAns: q.possibleAns || [],
                correctAnswer: q.correctAnswer || ""
            }));
        } catch (e) {
            console.error("Error parsing questions:", e);
            return [];
        }
    };
    const [questions] = useState<Question[]>(getQuestionsFromStorage());

    useEffect(() => {
        localStorage.setItem('quizTitle', quizTitle);
    }, [quizTitle]);

    const editTitle = (newTitle: string) => {
        setQuizTitle(newTitle);
    };

    const save = async () => {
        try{
            const token = localStorage.getItem('token');
            const quizData: QuizData = {
                title: quizTitle,
                questions: questions
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save quiz');
            } else {
                localStorage.setItem('elkuldve', JSON.stringify(quizData));
                const result = await response.json();//ez es a kovi sor nem kell
                console.log('Quiz saved successfully:', result);
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <form>
                <div className="background"/>
                <WorkHeader title={quizTitle} setTitle={(input) => {editTitle(input)}} save={() => save()} />
                <NewQuizContent/>
            </form>
        </>
    );
};

export default CreateNewQuiz;