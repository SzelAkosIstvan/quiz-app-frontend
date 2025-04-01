import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useState } from "react";

const StartQuiz = (quizCode: string[]) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState<string>('');
    const [question, setQuestion] = useState<any[] | null>(null);
    const fullQuizCode = quizCode.join("");

    const start = () => {
        const socket = new SockJS('http://localhost:8080/quiz-websocket');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                setStompClient(client);

                // Csatlakozás a kvízhez
                client.subscribe(`/topic/quiz/${fullQuizCode}/question`, (message) => {
                    setQuestion(JSON.parse(message.body));
                });

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

    return { stompClient, message, question, start };
};

export default StartQuiz;