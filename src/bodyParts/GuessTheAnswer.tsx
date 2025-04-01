import React from "react";
import '../styleSheets/questionStyle.css'

const guessTheAnswer = () => {
    return (
        <div className="multiple-choice" style={{ display: "flex", justifyContent: "space-around"}}>
            <input type={"text"} className="student-guess"/>
        </div>
    );
}

export default guessTheAnswer;