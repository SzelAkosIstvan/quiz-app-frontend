import React from "react";
import AvatarCreator from "../bodyParts/AvatarCreator";
import Header from "../bodyParts/Header";

const AvatarSetup: React.FC = () =>{
    return (
        <>
            <div className="background" />
            <Header />
            <AvatarCreator />
        </>
    );
}

export default AvatarSetup;