import React from 'react';
import { CalendarContainer } from 'react-datepicker';
import classes from './CalendarBlock.module.css';

const CalendarBlock = (props) => {
    return (
        <div className={classes.own}>
            <CalendarContainer className={classes.container}>
                {props.children}
            </CalendarContainer>
        </div>
    );
};

export default CalendarBlock;