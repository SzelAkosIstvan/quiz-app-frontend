import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useState } from "react";

const StartQuiz = (quizCode: string[]) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState<string>('');
    const [question, setQuestion] = useState<any | null>(null);
    const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
    const [imageLinks, setImageLinks] = useState<string | null>(null);
    const fullQuizCode = quizCode.join("");
    const [selected, setSelected] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

    const start = () => {
        const socket = new SockJS('http://localhost:8080/quiz-websocket');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                setStompClient(client);

                // Csatlakozás a kvízhez
                client.subscribe(`/topic/quiz/${fullQuizCode}/question`, (message) => {
                    // setQuestion(message.body);
                    const questionData = JSON.parse(message.body);
                    setQuestion(questionData.questionText);
                    setPossibleAnswers(questionData.possibleAnswers);
                    setImageLinks(questionData.imageLink);
                    //reset selection
                    setSelected(false);
                    console.log("jeloles reset");
                    setCorrectAnswer(null);
                });

                client.subscribe(`/topic/quiz/${fullQuizCode}/answers`, (message) => {
                    console.log("helyes valasz", message.body);
                    setCorrectAnswer(message.body);
                })

                // Hibák kezelése
                client.subscribe(`/topic/quiz/${fullQuizCode}/error`, (message) => {
                    setMessage(message.body);
                });

                client.subscribe(`/topic/quiz/${fullQuizCode}`, (message) => {
                    setMessage(message.body);
                })

                // Küldjük a csatlakozási kérést
                client.publish({ destination: `/app/join-quiz`, body: fullQuizCode });
            },
        });

        client.activate();
        return client;
    };

    return { stompClient, message, question, correctAnswer, possibleAnswers, imageLinks, selected, setSelected, start };
};

export default StartQuiz;