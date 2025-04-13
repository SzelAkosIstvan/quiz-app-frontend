import React, {useEffect} from "react";
import Bubble from "./Bubble";
import {getUserImage, getUserName, searchStyle} from "../styleSheets/userData";
import BackButton from "./BackButton";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const DisplayScore = () => {
    const [seed, setSeed] = React.useState("");
    const [style, setStyle] = React.useState("personas");
    const [userName, setUserName] = React.useState("");

    useEffect(() => {
        const imageVal = getUserImage();
        if (imageVal) {
            const userImage = imageVal.split('.')[0];
            const userStyle = searchStyle(imageVal.split('.')[1]);
            setSeed(userImage);
            setStyle(userStyle);
        }
        setUserName(getUserName());
    }, []);

    return (
        <div className="student-score">
            <Bubble background={"#E4E4E4"} content={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`} linkTo={"/score"} text={null}/>
            <div className="info">
                <h2>Thank you for being part of today's quiz</h2>
                <h1> {userName} </h1>
                <h2>You placed 5'th</h2>
            </div>
            <BackButton icon={faHouse} text={'Back to main page'}/>
        </div>
    );
};

export default DisplayScore;