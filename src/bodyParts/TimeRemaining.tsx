import React from "react";
import '../styleSheets/questionStyle.css';

type TimeProps = () => {
    currentTime: number;
}

const TimeRemaining = () => {


    return (
        <div className="max-time">
            <div className="current-time">
            </div>
        </div>
    );
};

export default TimeRemaining;