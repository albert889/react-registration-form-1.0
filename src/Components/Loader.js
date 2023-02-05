import React from 'react';
import "react-loader-spinner";
import { ThreeCircles } from "react-loader-spinner";
import "./Loader.css"


const Loader = () => {
    return (
        <div>
            <ThreeCircles height="80"
                width="80"
                align="center"
                radius="9"
                color="#8b96f4"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass />
        </div>
    )
}



export default Loader