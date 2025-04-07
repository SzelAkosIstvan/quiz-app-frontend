import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import './App.css';
import {getCookie ,decodeJwt} from "./styleSheets/userData";
import StudentQuizComponent from "./learn/StudentQuizComponent";
import TeacherQuizComponent from "./learn/TeacherQuizComponent";
import LoginPage from './learn/LoginPage';
import LearnFromGPT from './learn/LearnFromGPT'
import AvatarSetup from "./learn/AvatarSetup";
import CreateNewQuiz from "./learn/CreateNewQuiz";
import StudentMain from "./learn/StudentMain";
import ControlQuiz from "./learn/ControlQuiz";


function App() {
    const [id, setId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [teacherId, setTeacherId] = useState<string>('');
    const [quizName, setQuizName] = useState<string>('Internet Technology Lecture #3');
    const navigate = useNavigate();
    const location = useLocation();

    const authCheck = () => {
        return true;
    }

    useEffect(() => {//on loading, it detects if user is logged in or not and sends to '/'
        const token = getCookie('token');//localStorage.getItem("token");
        console.log(token);
        if (token) {
            const decoded = decodeJwt(token);
            console.log(decoded);
            if(decoded) {
                setId(decoded.id);
                setIsTeacher(decoded.teacherRole);
                // console.log(decoded.id);
                // console.log(decoded.username);
                // console.log(decoded.teacherRole);
                setIsAuthenticated(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            if(location.pathname==='/login')
                navigate('/');
            else
                navigate(location.pathname, { replace: true });
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, isTeacher, navigate]);

    return (
    <div className="App">
            <Routes>
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setIsTeacher={setIsTeacher} />}/>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            isTeacher ? (
                                <TeacherQuizComponent
                                    sendTeacherId={setTeacherId}
                                    setQuizName={setQuizName}
                                />
                            ) : (
                                <StudentMain/>
                                // <StudentQuizComponent />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/quiz"
                    element={
                        isAuthenticated? (
                            isTeacher? (
                                <ControlQuiz QuizName={quizName} teacherId={teacherId}/>
                            ) : (
                                <StudentQuizComponent />
                            )
                        ):(
                            <Navigate to="/login" replace />
                        )}
                />
                <Route
                    path="/learn"
                    element={
                        isAuthenticated? (
                            <LearnFromGPT />
                        ) : (
                            <Navigate to="/login" replace />
                        )}
                />
                <Route
                    path="/avatar"
                    element={
                        isAuthenticated? (
                            <AvatarSetup />
                        ) : (
                            <Navigate to="/login" replace />
                        )}
                />
                <Route
                    path="/quiz_lab"
                    element={
                        isAuthenticated? (
                            isTeacher ? (
                                <CreateNewQuiz />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
    </div>
  );
}

export default App;
