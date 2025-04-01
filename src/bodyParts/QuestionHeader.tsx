import React from "react";
import '../styleSheets/questionStyle.css'

interface QuestionHeaderInterface {
    sendRequest?: () => void;
    subject: string;
    setSubject: (subject: string) => void;
    topic: string;
    setTopic: (topic: string) => void;
}

const QuestionHeader: React.FC<QuestionHeaderInterface> = ({sendRequest, subject, setSubject, topic, setTopic}) => {

    return (
        <div className="question-header">
            <div className="title-container">
                <img src='../../public/logo.png' alt="VDU logo" />
                <div className="generative-info" style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{display: "flex", alignItems: 'center', height: '3vh'}}>
                        <p>Subject: </p>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div style={{display: "flex", alignItems: 'center', height: '3vh'}}>
                        <p> Topic: </p>
                        <input value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </div>
                    <button className="submit-btn" onClick={sendRequest}>Regenerate</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;