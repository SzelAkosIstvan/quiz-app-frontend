import React from "react";
import HeaderW from "./HeaderW";

type WaitScreenProps = {
    message: string;
}

const WaitScreen = ({message}: WaitScreenProps) => {
    return (
        <>
            <HeaderW/>
            <h1>{message}</h1>
        </>
    );
};

export default WaitScreen;