import React from 'react';
import "./PageNotFoundStyles.css";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    function handleGoToHomePage() {
        navigate("/");
    }

    return ( 
        <div className="pageNotFound">
            <div className="title">404</div>
            <div className="subtitle">Page Not Found</div>
            <button className="goToHomePage" onClick={() => handleGoToHomePage()}>Go to Home Page</button>
        </div>
     );
}
 
export default PageNotFound;