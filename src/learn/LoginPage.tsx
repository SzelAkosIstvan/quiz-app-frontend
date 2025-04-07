import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styleSheets/kinezet.css';
import {handleLogin} from '../styleSheets/userData';

interface LoginPageProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsTeacher: (isTeacher: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated , setIsTeacher}) => {
    const [id, setId] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                const userData = await handleLogin(id);

                if (userData) {
                    setIsTeacher(userData.isTeacher);
                    setIsAuthenticated(true);
                    navigate('/');
                }
            } catch (error) {
                alert("Wrong credentials");
            }
        }
    };

    return (
        <>
        <div className="background"/>
            <div className="header" id={isInputFocused ? "header-active" : undefined}>
                <img alt="VDU logo" />
            </div>
            <div className="login-container">
                <div className="profileImage" id={isInputFocused ? "profileImage-active" : undefined} />
                <form className="loginform">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        autoFocus
                    />
                </form>
            </div>
        </>
    );
};

export default LoginPage;