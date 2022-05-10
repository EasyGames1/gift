import React from 'react';
import classes from './TimeList.module.css';

const TimeList = (props) => {
    return (
        <div className={`row ${props.className}`}>
            {
                props.list?.map((time) =>
                    <div
                        key={time.title}
                        className={`col-xl-4 col-md-4 col-sm-12 ${classes.time}`}
                        style={{ marginBottom: '30px' }}
                        data-aos="fade-in"
                    >
                        <div
                            onClick={() => {
                                if (props.onClick) {
                                    props.onClick(time.time)
                                };
                            }}
                            className={classes.circle}
                            title={time.time}
                        >
                            <span className={`material-icons${time.outlined ? "-outlined" : ""}`}>{time.icon || "alarm"}</span>
                        </div>
                        <div
                            onClick={() => {
                                if (props.onClick) {
                                    props.onClick(time.time)
                                };
                            }}
                            className={`${classes.title} ${classes[props.theme]}`}
                            title={time.time}
                        >
                            {time.title}
                            <div className={classes.line} />
                        </div>
                    </div>
                )
            }
            {
                props.addible &&
                <div
                    className={`col-xl-4 col-md-4 col-sm-12 ${classes.time}`}
                    style={{ marginBottom: '30px' }}
                    data-aos="fade-in"
                >
                    <div
                        onClick={() => {
                            if (props.onAdd) {
                                props.onAdd()
                            };
                        }}
                        className={classes.circle}
                        title="Добавить таймер"
                    >
                        <span className="material-icons">add</span>
                    </div>
                    <div
                        onClick={() => {
                            if (props.onAdd) {
                                props.onAdd()
                            };
                        }}
                        className={`${classes.title} ${classes[props.theme]}`}
                        title="Добавить таймер"
                    >
                        Добавить таймер
                        <div className={classes.line} />
                    </div>
                </div>
            }
        </div>
    );
};

export default TimeList;