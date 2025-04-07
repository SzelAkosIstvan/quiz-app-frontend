import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../styleSheets/quiz.css';
import {useNavigate} from "react-router-dom";

interface TeacherQuizComponentProps {
    sendTeacherId: (code: string) => void;
    setQuizName: (name: string) => void;
}

const TeacherQuizComponent: React.FC<TeacherQuizComponentProps> = ({sendTeacherId, setQuizName}:TeacherQuizComponentProps) => {
    const navigate = useNavigate();
    const [teacherId, setTeacherId] = useState<string>('IF8994252');
    const [answers, setAnswers] = useState<string[]>([]);
    const [stompClient, setStompClient] = useState<Client | null>(null);

    const startQuiz = () => {
        setTeacherId(teacherId);
        navigate('/quiz');
    };

    const newQuiz = () => {
        navigate(`/quiz_lab`)
    }

    return (
        <div className='menu'>
            <header>
                <div className='logo'></div>
            </header>
            <div className="teacher-menu">
                <div className='menu-item' onClick={newQuiz}>
                    <h1>+</h1>
                    <h2>Create new quiz</h2>
                </div>
                <div className='menu-item' onClick={startQuiz}>
                    <h2> Start Quiz</h2>
                </div>
            </div>

            {/*<p>Kvíz kód: {quizCode}</p>*/}
            {/*<h2>Válaszok:</h2>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                ))}
            </ul>*/}
        </div>
    );
};

export default TeacherQuizComponent;