import React, {useEffect, useState} from 'react';
import Header from "../bodyParts/Header";
import JoinQuiz from "../bodyParts/JoinQuiz";
import StartQuiz from "../styleSheets/StartQuiz";
import PlayQuizGame from "./PlayQuizGame";

const StudentQuizComponent: React.FC = () => {
    const [quizCode, setQuizCode] = useState<string[]>(Array(8).fill(""));
    const { stompClient, message, question, possibleAnswers, imageLinks, start } = StartQuiz(quizCode);

    const submitAnswer = (answer: string) => {
        if (stompClient) {
            const fullQuizCode = quizCode.join("");
            stompClient.publish({ destination: `/app/submit-answer`, body: JSON.stringify({ fullQuizCode, answer }) });
        }
    };

    useEffect(() => {
        return () => {
            // Clean up WebSocket connection when component unmounts
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [stompClient]);

    return (
        <>
        { message!=="Wait for other people to join" ? (
            <>
                <div className="background" />
                <Header/>
                <JoinQuiz quizCode={quizCode} setQuizCode={setQuizCode} start={start} />
                {/*{questions.map((question, index) => (*/}
                {/*    <div key={index}>*/}
                {/*        <h3>{question.questionText}</h3>*/}
                {/*        <ul>*/}
                {/*            {question.answers.map((answer: any, idx: number) => (*/}
                {/*                <li key={idx}>{answer.answerText}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*))}*/}
                {/*<button onClick={() => submitAnswer("A válaszom")}>Válasz küldése</button>*/}
            </>
        ) : (
            <PlayQuizGame
                key={question ? question.id : 'waiting'}
                question={question}
                answers={possibleAnswers}
                correctAnswer={null}
                imageUrl={imageLinks}
            />
        ) }
        </>
    );
};

export default StudentQuizComponent;