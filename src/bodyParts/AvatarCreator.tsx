import React, {useEffect, useRef} from "react";
import '../styleSheets/questionStyle.css'
import {getUserImage, setNewUserImage} from "../styleSheets/userData";
import {useNavigate} from "react-router-dom";

// This part generates a 6 character string what will be the seed for the api request
const generateRandomSeed = (length: number = 6): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// The API what I used here (dicebear) has so many figure stiles but in this project I used only these 4
const searchStyle = (styleInitial: string): string => {
    if(styleInitial === 'p') {
        return 'personas';
    } else if(styleInitial === 'a') {
        return 'adventurer-neutral';
    } else if(styleInitial === 'm') {
        return 'micah';
    } else {
        return 'open-peeps';
    }
};

const AvatarCreator: React.FC = () => {
    const [seed, setSeed] = React.useState("");
    const [style, setStyle] = React.useState("personas");
    const inputRef = useRef<HTMLInputElement>(null);
    const isInitialLoad = useRef(true);
    const navigate = useNavigate();

    // when the user opens this page, the image what they see is theirs
    useEffect(() => {
        if(isInitialLoad.current) {
            const imageVal = getUserImage();
            if (imageVal) {
                const userImage = imageVal.split('.')[0];
                const userStyle = searchStyle(imageVal.split('.')[1]);
                setSeed(userImage);
                setStyle(userStyle);
            } else {
                const randomSeed = generateRandomSeed();
                setSeed(randomSeed);
            }
        }
    }, []);

    // after every change made (new item selected from the theme list) new seed will be generated and random image appears
    useEffect(() => {
        if(!isInitialLoad.current) {
            const randomSeed = generateRandomSeed();
            setSeed(randomSeed);
        }
    }, [style]);

    const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value);
        if(inputRef.current) {
            inputRef.current.value = "";
            isInitialLoad.current = false;
        }
    };

    // When user hits the save button, profile images data is saved in database and user is navigated back to menu
    const handleSubmit = async () => {
        const newImageVal = seed + "." + style[0];
        // console.log("Form submitted with:", { newImageVal });
        try {
            await setNewUserImage(newImageVal);
            navigate(`/`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="avatar-tools">
            <div className="avatar-wrapper">
                <img alt="" className="avatar-image" src={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`}/>{/* api in use with the variables */}
                <form>
                    <select onChange={handleChanges} value={style}>
                        <option value="personas">Personas</option>
                        <option value="adventurer-neutral">Adventurer Neutral</option>
                        <option value="micah">Micah</option>
                        <option value="open-peeps">Open Peeps</option>
                    </select>
                    <input type="text" ref={inputRef} onChange={e => setSeed(e.target.value)} />
                </form>
                <h3>Be careful with sensitive data in the creation code</h3>
            </div>
            <button type={"submit"} className="avatar-upload" /*disabled = {!hasChanges}*/ onClick={handleSubmit}>Save changes</button>
        </div>
    );
};

export default AvatarCreator;