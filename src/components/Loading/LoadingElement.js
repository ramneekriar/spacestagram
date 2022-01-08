import React from "react";
import './Loading.css';

const LoadingElement = ({ type }) => {
    const classes = `loading ${type}`
    return (
        <div className={classes}></div>
    )
}

export default LoadingElement;