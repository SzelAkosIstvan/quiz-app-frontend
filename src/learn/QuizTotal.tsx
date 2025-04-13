import React, {useEffect} from "react";
import HeaderW from "../bodyParts/HeaderW";
import {useNavigate} from "react-router-dom";

const QuizTotal = () => {
    const navigate = useNavigate();

    // Set up the keydown event listener
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                navigate("/"); // Navigate to '/' on Enter key press
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyPress);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [navigate]);

    return (
        <>
            <h1>Thank you for joining</h1>
        </>
    );
};

export default QuizTotal;