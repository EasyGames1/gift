import React, { useEffect, useState } from 'react';
import classes from './Pagination.module.css';
import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';
import InputPlaceholder from '../InputPlaceholder/InputPlaceholder';

const Pagination = (props) => {
    const navigate = useNavigate();
    const pages = Math.ceil(props.totalCount / props.size) - 1;
    const [to, setTo] = useState('');
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (highlight) {
            setTimeout(() => {
                setHighlight(false);
            }, 1500);
        };
    }, [highlight]);

    return (
        <div className={`${classes.pagination} ${classes[props.theme]}`}>
            <div className={classes.control}>
                <div className={`${classes.keys} ${classes[props.theme]}`}>
                    <IconButton
                        theme={props.theme}
                        onClick={() => {
                            if (Number(props.current) - 1 > 0) {
                                navigate(`${props.path}${Number(props.current) - 1}`);
                            };
                        }}
                        title="К предыдущей странице"
                    >
                        keyboard_double_arrow_left
                    </IconButton>
                    <IconButton
                        theme={props.theme}
                        onClick={() => {
                            if (Number(props.current) + 1 <= pages) {
                                navigate(`${props.path}${Number(props.current) + 1}`);
                            };
                        }}
                        title="К следующей странице"
                    >
                        keyboard_double_arrow_right
                    </IconButton>
                </div>
                <div className={classes.inp}>
                    <InputPlaceholder
                        placeholder="К"
                        bg={props.theme === "light" ? "#e9ecef" : "#191919"}
                        style={{ maxWidth: "66px" }}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        theme={props.theme}
                        type="number"
                        highlight={highlight}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (!/^\s*$/.test(to) && to > 0 && to <= pages && props.current != to) {
                                    navigate(`${props.path}${to}`);
                                } else {
                                    setHighlight(true);
                                };
                            };
                        }}
                    />
                    <IconButton
                        theme={props.theme}
                        style={{ color: "#06d6a0", filter: "invert(0%)" }}
                        title={!/^\s*$/.test(to) && to > 0 && to <= pages ? `Перейти на страницу ${to}` : "Введите допустимое значение."}
                        onClick={() => {
                            if (!/^\s*$/.test(to) && to > 0 && to <= pages && props.current != to) {
                                navigate(`${props.path}${to}`);
                            } else {
                                setHighlight(true);
                            };
                        }}
                    >
                        navigate_next
                    </IconButton>
                </div>
            </div>
            <span>
                {
                    props.current
                }/
                {
                    pages
                }
            </span>
        </div>

    );
};

export default Pagination;