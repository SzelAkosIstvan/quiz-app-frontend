import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
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
import PersonalScore from "./learn/PersonalScore";
import QuizTotal from "./learn/QuizTotal";


function App() {
    //const [id, setId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [teacherId, setTeacherId] = useState<string>('');
    const [quizName, setQuizName] = useState<string>('');
    const [quizId, setQuizId] = useState<number>(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {//on loading, it detects if user is logged in or not and sends to '/'
        const token = getCookie('token');//localStorage.getItem("token");
        console.log(token);
        if (token) {
            const decoded = decodeJwt(token);
            console.log(decoded);
            if(decoded) {
                //setId(decoded.id);
                setIsTeacher(decoded.teacherRole);
                    setTeacherId(decoded.id);

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
    }, [isAuthenticated, isTeacher, navigate, location.pathname]);

    return (
    <div className="App">
            <Routes>
                <Route path="/total" element={<QuizTotal/>}/>
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setIsTeacher={setIsTeacher} />}/>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            isTeacher ? (
                                <TeacherQuizComponent setQuizName={setQuizName} setQuizId={setQuizId}/>
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
                                <ControlQuiz QuizName={quizName} teacherId={teacherId} quizID={quizId} />
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
                        isTeacher? (
                                <CreateNewQuiz />
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
