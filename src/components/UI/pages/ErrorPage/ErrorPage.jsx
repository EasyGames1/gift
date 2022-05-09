import React from 'react';
import Modals from '../../Modals/Modals';
import Navbar from '../../Navbar/Navbar';
import classes from './ErrorPage.module.css';

const ErrorPage = (props) => {
    return (
        <>
            <div className={classes.fullScreen}>
                <h1>404</h1>
            </div>
        </>
    );
};

export default ErrorPage;