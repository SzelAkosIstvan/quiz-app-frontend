import React, {useEffect} from "react";
import '../styleSheets/questionStyle.css'
import Bubble from "./Bubble";
import {getUserImage, searchStyle} from "../styleSheets/userData";
import BackButton from "./BackButton";
import {faHouseLock} from "@fortawesome/free-solid-svg-icons";

const StudyOptions = () => {
    const [seed, setSeed] = React.useState("");
    const [style, setStyle] = React.useState("personas");

    useEffect(() => {
        const imageVal = getUserImage();
        if (imageVal) {
            const userImage = imageVal.split('.')[0];
            const userStyle = searchStyle(imageVal.split('.')[1]);
            setSeed(userImage);
            setStyle(userStyle);
        }
    }, []);

    return (
        <div className="study-opt">
            <Bubble background={"#E4E4E4"} content={null} linkTo={"quiz"} text={"Join quiz, gl :D"} />
            <Bubble background={"#71347A"} content={null} linkTo={"learn"} text={"Train your knowledge"} />
            <Bubble background={"#E4E4E4"} content={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`} linkTo={"avatar"} text={null} />
            <BackButton icon={faHouseLock} text={"Logout"}/>
        </div>
    );
}

export default StudyOptions;