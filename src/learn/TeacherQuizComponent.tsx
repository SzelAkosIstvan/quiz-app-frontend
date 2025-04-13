import React, { useState } from 'react';
import '../styleSheets/quiz.css';
import {useNavigate} from "react-router-dom";
import BackButton from "../bodyParts/BackButton";
import {faHouseLock} from "@fortawesome/free-solid-svg-icons";

const TeacherQuizComponent: React.FC = () => {
    const navigate = useNavigate();
    const [teacherId, setTeacherId] = useState<string>('IF8994252');

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
            <BackButton icon={faHouseLock} text={"Logout"}/>

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