import React from "react";

type InformationToShow = {
    QuizTitle: string;
    QuizCode: String;
}

const ShowCode = ({QuizTitle, QuizCode}: InformationToShow) => {
    return (
        <div className="quiz-code">
            <div className="show-title">
                <h1>{QuizTitle}</h1>
            </div>
            <div className="show-code">
                {QuizCode.slice(0, 4).split('').map((digit, index) => (
                    <div className="code" key={`first-${index}`}>{digit}</div>
                ))}
                -
                {QuizCode.slice(4).split('').map((digit, index) => (
                    <div className="code" key={`second-${index}`}>{digit}</div>
                ))}
            </div>
            <div className="other-info">
                <h5>Join today’s quiz using VDU quiz mobile app or vduquiz.lt in your browser.</h5>
                <h5>The grades doesn’t influance your final grade !</h5>
            </div>
        </div>
    );
};

export default ShowCode;