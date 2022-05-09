import React, { useEffect, useState } from 'react';
import classes from './DateInput.module.css';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import CalendarBlock from '../CalendarBlock/CalendarBlock';
import ru from 'date-fns/locale/ru';

const DateInput = (props) => {
    const addTheme = () => {
        if (props.theme === "dark") {
            for (let i = 0; i < document.querySelectorAll(".react-datepicker-popper").length; i++) {
                document.querySelectorAll(".react-datepicker-popper")[i].classList.add("dark");
            };
        } else {
            for (let i = 0; i < document.querySelectorAll(".react-datepicker-popper").length; i++) {
                document.querySelectorAll(".react-datepicker-popper")[i].classList.remove("dark");
            };
        };
    };

    useEffect(addTheme, [props.theme]);

    useEffect(() => {
        if (props.date == null) {
            props.setDate(new Date());
        };
        if (props.start) {
            if (props.date < props.start) {
                props.setDate(new Date());
            };
        };
    }, [props.date]);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll(".react-datepicker__input-container").forEach((el => el.childNodes[0].setAttribute("readOnly", true)));
        };
    }, []);

    return (
        <div className={props.className} style={props.style}>
            <DataPicker
                locale={ru}
                selected={props.date}
                onChange={(date) => {
                    props.setDate(date);
                    if (props.onChange) {
                        props.onChange(date);
                    };
                }}
                onInputClick={addTheme}
                calendarContainer={CalendarBlock}
                dateFormat="dd.MM.yyyy"
                className={`${classes.inp} ${classes[props.theme]}`}
                timeInputLabel="Во сколько:"
                showTimeInput
                todayButton="Использовать сегодня"
                showMonthDropdown
                showYearDropdown
            />
        </div>
    );
};

export default DateInput;