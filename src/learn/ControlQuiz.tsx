import React, {useEffect, useState, useRef} from "react";
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
    const [answers, setAnswers] = useState<string[]>([]);
    const stompClientRef = useRef<Client | null>(null);

    const startQuiz = () => {
        const socket = new SockJS('http://localhost:8080/quiz-websocket');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClientRef.current = client;
                console.log('Connected!');
                client.publish({ destination: `/app/start-quiz`, body: JSON.stringify({ quizId: "1", teacherId }) });

                client.subscribe(`/topic/teacher/${teacherId}/answers`, (message) => {
                    setAnswers((prevAnswers) => [...prevAnswers, message.body]);
                });

                client.subscribe(`/topic/teacher/${teacherId}/quiz-code`, (message) => {
                    setQuizCode(message.body);
                    localStorage.setItem('quizCode', JSON.stringify(message.body));
                });
            },
        });

        client.activate();
        return client;
    };

    const sendNextQuestion = () => {
        console.log("Sending Quiz");
        if (stompClientRef.current) {
            console.log("stomp client exists");
            stompClientRef.current.publish({
                destination: '/app/next-question',
                body: JSON.stringify({ quizCode: quizCode })
            });
            console.log("Question sent");
        }
    };

    useEffect(() => {
        const client = startQuiz();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                setShowQuestion(true);
                setQuestionORStats(prev => !prev);
                sendNextQuestion();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (client) {
                client.deactivate();
            }
        };
    }, [quizCode]);

    return (
        <>
            <HeaderW />
            {!showQuestion ? (
                <ShowCode QuizTitle={QuizName} QuizCode={quizCode}/>
            ) : (
                questionORStats ? (
                    <div className="cQiz">
                        <Question question={"Teszt kerdes a tanar szemszogebol marha hosszan nagyban halomalo shiu biu hehahhe"} visualUrl={"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-videoSixteenByNineJumbo1600-v6.jpg"}/>
                        <TimeRemaining />
                    </div>
                ) : (
                    <Statistics />
                )
            )}
        </>
    );
}

export default ControlQuiz;