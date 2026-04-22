import React, {useEffect, useState} from "react";
import WorkHeader from "../bodyParts/WorkHeader";
import NewQuizContent from "../bodyParts/NewQuizContent";
import {useNavigate} from "react-router-dom";

interface Question {
    type: string;
    question: string;
    possibleAns: string[];
    correctAnswer: string;
    questionImage: string | null;
}

interface ApiQuestion {
    type: string;
    question: string;
    possibleAns: string[];
    correctAnswer: string;
    imagekey: string | null;
}

interface QuizData {
    title: string;
    questions: ApiQuestion[];
}

const CreateNewQuiz = () => {
    const navigate = useNavigate();
    const [quizTitle, setQuizTitle] = useState(() => {
        const savedTitle = localStorage.getItem('quizTitle');
        return savedTitle || "Quiz title";
    });
    const getQuestionsFromStorage = (): Question[] => {
        try {
            const savedQuestions = localStorage.getItem('questions');
            if (!savedQuestions) return [];

            const rawQuestions = JSON.parse(savedQuestions);
            return rawQuestions.map((q: any): Question => ({
                type: q.type || "closed",
                question: q.question || "",
                possibleAns: q.possibleAns || [],
                correctAnswer: q.correctAnswer || "",
                questionImage: q.questionImage || q.imagekey || null
            }));
        } catch (e) {
            console.error("Error parsing questions:", e);
            return [];
        }
    };
    useEffect(() => {
        localStorage.setItem('quizTitle', quizTitle);
    }, [quizTitle]);

    const editTitle = (newTitle: string) => {
        setQuizTitle(newTitle);
    };

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) { // @ts-ignore
            return parts.pop().split(';').shift();
        }
        return null;
    };

    const save = async () => {
        try {
            const token = getCookie("token");
            const questions = getQuestionsFromStorage();

            const uploadImage = async (imageSource: string, index: number): Promise<string> => {
                const imageResponse = await fetch(imageSource);
                const imageBlob = await imageResponse.blob();
                const extension = imageBlob.type.split("/")[1] || "png";
                const file = new File([imageBlob], `question-${index + 1}.${extension}`, { type: imageBlob.type });

                const formData = new FormData();
                formData.append("file", file);
                formData.append("fileName", file.name);

                const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/file/upload`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error(await uploadResponse.text());
                }

                const rawResult = (await uploadResponse.text()).trim();
                try {
                    const parsed = JSON.parse(rawResult);
                    return parsed.imagekey || parsed.key || parsed.url || rawResult;
                } catch {
                    return rawResult.replace(/^"|"$/g, "");
                }
            };

            const apiQuestions: ApiQuestion[] = await Promise.all(
                questions.map(async (question, index) => {
                    let imageKey: string | null = question.questionImage;

                    if (question.questionImage && question.questionImage.startsWith("data:image/")) {
                        imageKey = await uploadImage(question.questionImage, index);
                    }

                    return {
                        type: question.type,
                        question: question.question,
                        possibleAns: question.possibleAns,
                        correctAnswer: question.correctAnswer,
                        imagekey: imageKey,
                    };
                })
            );

            const quizData: QuizData = {
                title: quizTitle,
                questions: apiQuestions,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quizzes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(quizData),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            localStorage.removeItem("quizTitle");
            localStorage.removeItem("questions");
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

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