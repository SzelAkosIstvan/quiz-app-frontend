import React from "react";
import { useNavigate } from 'react-router-dom';

const HeaderW: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="header" id="white">
            <img alt="VDU logo" onClick={() => navigate(-1)} />
        </div>
    );
};

export default HeaderW;