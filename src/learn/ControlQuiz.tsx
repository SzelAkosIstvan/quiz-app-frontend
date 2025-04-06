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
    const [question, setQuestion] = useState<string>("");
    const [imageUrl, setImageUrl] = useState("");

    const startQuiz = () => {
        const socket = new SockJS('http://localhost:8080/quiz-websocket');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClientRef.current = client;
                console.log('Connected!');
                client.publish({ destination: `/app/start-quiz`, body: JSON.stringify({ quizId: "1", teacherId }) });

                client.subscribe(`/topic/teacher/${teacherId}/answers`, (message) => {
                    console.log("Recieved answer submission:", message.body);
                    setAnswers((prevAnswers) => [...prevAnswers, message.body]);
                });

                client.subscribe(`/topic/teacher/${teacherId}/quiz-code`, (message) => {
                    setQuizCode(message.body);
                    localStorage.setItem('quizCode', JSON.stringify(message.body));
                });

                client.subscribe(`/topic/quiz/${quizCode}/question`, (message) => {
                    // setQuestion(message.body);
                    const questionData = JSON.parse(message.body);
                    setQuestion(questionData.questionText);
                    setImageUrl(questionData.imageLink);
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

    const showCurrentCorrect = () => {
        console.log("showCurrentCorrect");
        if (stompClientRef.current) {
            stompClientRef.current.publish({
                destination: `/app/current-correct`,
                body: quizCode
            });
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
            if (keydownCount>0 && e.code === "KeyV") {
                showCurrentCorrect();
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