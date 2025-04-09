import React from "react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <img alt="VDU logo" onClick={() => navigate(-1)} />
        </div>
    );
};

export default Header;