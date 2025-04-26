import React, {useEffect, useState} from 'react';
import '../styleSheets/quiz.css';
import {useNavigate} from "react-router-dom";
import BackButton from "../bodyParts/BackButton";
import {faHouseLock} from "@fortawesome/free-solid-svg-icons";
import {getQuizList, QuizListData} from "../styleSheets/userData";

interface TeacherProps {
    setQuizName: (name: string) => void;
    setQuizId: (id: number) => void;
}

const TeacherQuizComponent: React.FC<TeacherProps> = ({setQuizName, setQuizId}: TeacherProps) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState<QuizListData[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<QuizListData>();

    const startQuiz = () => {
        if (selectedQuiz && selectedQuiz.id !== -1) {
            setQuizName(selectedQuiz.name);
            setQuizId(selectedQuiz.id);
            navigate('/quiz');
        }
    };

    const newQuiz = () => {
        navigate(`/quiz_lab`)
    }

    const handleQuizSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = options.find(opt => opt.name === e.target.value);
        if (selected) {
            setSelectedQuiz(selected);
        }
    };

    useEffect(() => {
        console.log(selectedQuiz);
    }, [setQuizName]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizzes = await getQuizList();
                if (quizzes.length > 0) {
                    const formatted = quizzes.map((quiz: object) => {
                        const [name, id] = Object.entries(quiz)[0];
                        return { name, id };
                    });
                    setOptions(formatted);
                    setSelectedQuiz(formatted[0]);
                } else {
                    setOptions([{ name: 'You dont have any quizzes', id: -1 }]);
                }
            } catch (error) {
                console.error("Failed to fetch quizzes:", error);
                setOptions([{ name: 'Error loading quizzes', id: -1 }]);
            }
        };

        fetchQuizzes();
    }, []);

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
                <div
                    className='menu-item'
                    onClick={() => {
                    if (options.length > 0 && options[0].name !== 'You dont have any quizzes') {
                        startQuiz();
                    }
                }}>
                    <select
                        className="select-quiz"
                        onClick={(e) => e.stopPropagation()}//I would like to be used in this form. if i click the select thing, let me use it but if I click inside the div anywhere aroud the select I would like to start theat quiz
                        onChange={handleQuizSelect}
                        value={selectedQuiz?.name ?? 'You dont have any quizzes'}
                        disabled={options.length === 1 && options[0].name=== 'You dont have any quizzes'}
                    >
                        {options.map((option) => (
                            <option value={option.name} key={option.id}> {option.name} </option>
                        ))}
                    </select>
                    <h2> Start Quiz</h2>
                </div>
            </div>
            <BackButton icon={faHouseLock} text={"Logout"}/>
        </div>
    );
};

export default TeacherQuizComponent;