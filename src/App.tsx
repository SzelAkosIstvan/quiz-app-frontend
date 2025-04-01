import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import StudentQuizComponent from "./learn/StudentQuizComponent";
import TeacherQuizComponent from "./learn/TeacherQuizComponent";
import LoginPage from './learn/LoginPage';
import LearnFromGPT from './learn/LearnFromGPT'
import AvatarSetup from "./learn/AvatarSetup";
import CreateNewQuiz from "./learn/CreateNewQuiz";
import StudentMain from "./learn/StudentMain";
import ControlQuiz from "./learn/ControlQuiz";

const decodeJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1]; // A payload rész kinyerése
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL-safe karakterek cseréje
        const payload = JSON.parse(atob(base64)); // Base64 dekódolás és JSON parse
        return payload;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [teacherId, setTeacherId] = useState<string>('IF8994252');
    const [quizName, setQuizName] = useState<string>('Internet Technology Lecture #3');

    const authCheck = () => {
        return true;
    }

    useEffect(() => {//on loading, it detects if user is logged in or not and sends to '/'
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = decodeJwt(token);
            if(decoded) {
                setIsTeacher(decoded.teacherRole);
                // console.log(decoded.id);
                // console.log(decoded.username);
                // console.log(decoded.teacherRole);
                setIsAuthenticated(true);
            }
        }
    }, []);

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/game" element={<StudentQuizComponent />} />
                <Route path="/studMain" element={<StudentMain/>} />
                <Route path="/teacherMain" element={<TeacherQuizComponent sendTeacherId={setTeacherId} setQuizName={setQuizName}/>} />
                {/*<Route path="/playQuiz" element={<PlayQuizGame />} />*/}
                <Route path="/controlQuiz" element={<ControlQuiz QuizName={quizName} teacherId={teacherId}/>} />
                <Route path="/student" element={<StudentMain />} />
                <Route path="/learn" element={<LearnFromGPT />} />
                <Route path="/avatar" element={<AvatarSetup />} />
                <Route path="/quiz_lab" element={<CreateNewQuiz />} />
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
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
