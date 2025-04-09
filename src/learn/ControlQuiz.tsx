import React, {useEffect, useState, useRef, useCallback} from "react";
import ShowCode from "../bodyParts/ShowCode";
import HeaderW from "../bodyParts/HeaderW";
import Question from "../bodyParts/Question";
import Statistics from "../bodyParts/Statistics";
import TimeRemaining from "../bodyParts/TimeRemaining";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

type ControlQuizProps = {
    QuizName: string;
    teacherId: string;
}

const ControlQuiz = ({QuizName, teacherId}: ControlQuizProps) => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionORStats, setQuestionORStats] = useState(false);
    const [quizCode, setQuizCode] = useState<string>("");
    //const [answers, setAnswers] = useState<string[]>([]);
    const stompClientRef = useRef<Client | null>(null);
    let keydownCount = useRef(0);
    const [question, setQuestion] = useState<string>("");
    const [imageUrl, setImageUrl] = useState("");

    const startQuiz = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/quiz-websocket');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClientRef.current = client;
                console.log('Connected!');
                client.publish({ destination: `/app/start-quiz`, body: JSON.stringify({ quizId: "1", teacherId }) });

                client.subscribe(`/topic/teacher/${teacherId}/quiz-code`, (message) => {
                    setQuizCode(message.body);
                    localStorage.setItem('quizCode', JSON.stringify(message.body));
                });

                client.subscribe(`/topic/quiz/${quizCode}/question`, (message) => {
                    const questionData = JSON.parse(message.body);
                    setQuestion(questionData.questionText);
                    setImageUrl(questionData.imageLink);
                });
            },
        });

        client.activate();
        return client;
    }, [quizCode, teacherId]);

    const sendNextQuestion = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.publish({
                destination: '/app/next-question',
                body: quizCode
            });
        }
    }, [quizCode]);

    const showCurrentCorrect = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.publish({
                destination: `/app/current-correct`,
                body: quizCode
            });
        }
    }, [quizCode]);

    useEffect(() => {
        const client = startQuiz();

        const handleKeyDown = (e: KeyboardEvent) => {
            if(keydownCount.current===0) {
                setShowQuestion(true);
                setQuestionORStats(prev => !prev);
                sendNextQuestion();
            }
            if (keydownCount.current>0 && e.code === "Space") {
                setQuestionORStats(prev => !prev);
            }
            if (keydownCount.current>0 && e.code === "Enter") {
                sendNextQuestion();
            }
            if (keydownCount.current>0 && e.code === "KeyV") {
                showCurrentCorrect();
            }
            keydownCount.current++;
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (client) {
                client.deactivate();
            }
        };
    }, [quizCode, startQuiz, sendNextQuestion, showCurrentCorrect]);

    return (
        <>
            <HeaderW />
            {!showQuestion ? (
                <ShowCode QuizTitle={QuizName} QuizCode={quizCode}/>
            ) : (
                <>
                    {questionORStats ? (
                        <div className="cQiz">
                            <Question question={question} visualUrl={imageUrl}/>
                        </div>
                    ) : (
                        <Statistics question={question}/>
                    )}
                    <TimeRemaining
                        key={question}
                    />
                </>
            )}
        </>
    );
}

export default ControlQuiz;