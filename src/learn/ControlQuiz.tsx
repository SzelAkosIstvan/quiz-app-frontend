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
    let keydownCount = 0;

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
        console.log("activating quiz");
        if (stompClientRef.current) {
            console.log("stomp client exists");
            stompClientRef.current.publish({
                destination: '/app/next-question',
                body: quizCode
            });
            console.log("Question sent");
        }
    };

    useEffect(() => {
        const client = startQuiz();

        const handleKeyDown = (e: KeyboardEvent) => {
            if(keydownCount===0) {
                setShowQuestion(true);
                setQuestionORStats(prev => !prev);
                sendNextQuestion();
            }
            if (keydownCount>0 && e.code === "Space") {
                setQuestionORStats(prev => !prev);
            }
            if (keydownCount>0 && e.code === "Enter") {
                sendNextQuestion();
            }
            keydownCount++;
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
                <>
                    {questionORStats ? (
                        <div className="cQiz">
                            <Question question={"Teszt kerdes a tanar szemszogebol marha hosszan nagyban halomalo shiu biu hehahhe"} visualUrl={"https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-videoSixteenByNineJumbo1600-v6.jpg"}/>
                        </div>
                    ) : (
                        <Statistics />
                    )}
                    <TimeRemaining />
                </>
            )}
        </>
    );
}

export default ControlQuiz;