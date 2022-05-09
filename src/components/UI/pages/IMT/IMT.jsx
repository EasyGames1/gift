import React, { useEffect, useState } from 'react';
import classes from './IMT.module.css';
import InputPlaceholder from '../../InputPlaceholder/InputPlaceholder';
import IconButton from '../../IconButton/IconButton';
import Storage from '../../../../API/Storage';
import Time from '../../../../API/Time';
import List from '../../List/List';
import Calculations from '../../../../API/Calculations';
import IMTGraph from '../../Graphs/IMTGraph/IMTGraph';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';

const IMT = (props) => {
    const [modal, setModal] = useState(false);
    const [current, setCurrent] = useState(props.imt ? 0 : '');
    const [highlight, setHighlight] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [data, setData] = useState(Storage.getUserData('data')?.extended?.imt || []);

    const save = () => {
        if ((/^\s*$/.test(height) || height < 40 || height > 300) && !data[data.length - 1]?.height) {
            setHighlight(0);
            return;
        };
        if (/^\s*$/.test(weight) || weight < 2 || weight > 500) {
            setHighlight(1);
            return;
        };
        setData([...data, {
            weight: weight,
            height: /^\s*$/.test(height) || height < 40 || height > 300 ? data[data.length - 1]?.height : height,
            date: Time.getFullDate()
        }]);
        setWeight('');
        setHeight('');
        setCurrent(0);
    };

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                imt: data
            }
        });
        if (data.length === 0) {
            setCurrent(0);
        };
    }, [data]);

    useEffect(() => {
        if (highlight !== '') {
            setCurrent(highlight);
            setTimeout(() => {
                setCurrent(highlight);
                setHighlight('');
            }, 1500);
        };
    }, [highlight]);

    return (
        <div className={classes.IMT}>
            <h1 className='text-center jcsb'>
                Индекс массы тела
                <IconButton
                    theme={props.theme}
                    style={current === '' ? { color: "#37911F", filter: "invert(0%)" } :
                        ((!/^\s*$/.test(height) && height >= 40 && height <= 300) || data[data.length - 1]?.height) &&
                            (!/^\s*$/.test(weight) && weight >= 2 && weight <= 500) ?
                            {color: "#4361ee", filter: "invert(0%)"} :
                            { color: "#BA0000", filter: "invert(0%)" }}
                    onClick={() => {
                        if (((!/^\s*$/.test(height) && height >= 40 && height <= 300) || data[data.length - 1]?.height) &&
                        (!/^\s*$/.test(weight) && weight >= 2 && weight <= 500)) {
                            save();
                        } else {
                            setCurrent(current === '' ? 0 : '');
                        };
                    }}
                    title={current === '' ? 'Добавить информацию' :
                        ((!/^\s*$/.test(height) && height >= 40 && height <= 300) || data[data.length - 1]?.height) &&
                            (!/^\s*$/.test(weight) && weight >= 2 && weight <= 500) ?
                            "Сохранить информацию" :
                            "Не добавлять информацию"}
                >
                    {
                        current === '' ?
                            "add_circle" :
                            ((!/^\s*$/.test(height) && height >= 40 && height <= 300) || data[data.length - 1]?.height) &&
                                (!/^\s*$/.test(weight) && weight >= 2 && weight <= 500) ?
                                "save" :
                                "cancel"
                    }
                </IconButton>
            </h1>
            <div className="mw500 text-center mt-3">
                {
                    current !== '' &&
                    <>
                        <InputPlaceholder
                            theme={props.theme}
                            type="number"
                            autoFocus={current === 0}
                            highlight={highlight === 0}
                            placeholder={data[data.length - 1]?.height ? `Ваш рост, ${data[data.length - 1]?.height} см` : "Ваш рост"}
                            condition="Введите значение от 40 до 300"
                            bg={props.theme === "light" ? "#fff" : "#202020"}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setCurrent(1);
                                };
                                if (e.key === "Backspace") {
                                    if (e.target.value === "") {
                                        setCurrent('');
                                    };
                                };
                            }}
                        />
                        <InputPlaceholder
                            theme={props.theme}
                            type="number"
                            autoFocus={current === 1}
                            highlight={highlight === 1}
                            placeholder={data[data.length - 1]?.weight ? `Ваш вес, ${data[data.length - 1]?.weight} кг` : "Ваш вес"}
                            condition="Введите значение от 2 до 500"
                            bg={props.theme === "light" ? "#fff" : "#202020"}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    save();
                                };
                                if (e.key === "Backspace") {
                                    if (e.target.value === "") {
                                        setCurrent(0);
                                    };
                                };
                            }}
                        />
                    </>
                }
            </div>
            {
                data.length > 0 &&
                <>
                    <IMTGraph data={data} />
                    <h3 className="text-uppercase text-center blue mt-3">История роста и веса</h3>
                    <List
                        theme={props.theme}
                        className="mt-3"
                    >
                        {
                            data?.map((el, index) =>
                                <li className='jcsb' key={index}>
                                    <div>
                                        {
                                            Time.dateToStr(el.date)
                                        } -&nbsp;
                                        {
                                            el.height
                                        } см при&nbsp;
                                        {
                                            el.weight
                                        } кг -&nbsp;
                                        {
                                            Calculations.imt(el.height, el.weight)[0]
                                        } ({Math.round(Calculations.imt(el.height, el.weight)[1] * 100) / 100}).&nbsp;
                                        {
                                            Calculations.imt(el.height, el.weight)[2]
                                        }
                                    </div>
                                    <IconButton
                                        theme={props.theme}
                                        style={{ color: "#BA0000", filter: "invert(0%)" }}
                                        onClick={() => setData(data.filter((el, i) => i !== index))}
                                    >
                                        delete
                                    </IconButton>
                                </li>
                            )
                        }
                    </List>
                    <div className="text-center">
                        <Button
                            red
                            onClick={() => setModal(true)}
                        >
                            Очистить историю
                        </Button>
                    </div>
                </>
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Подтверждение"
                footer="Очистить"
                footerRed
                onAccept={() => {
                    setData([]);
                    setModal(false);
                }}
            >
                <div className="mw500">
                    <h3>
                        Вы уверены, что хотите очистить историю ИМТ?
                    </h3>
                </div>
            </Modal>
        </div>
    );
};

export default IMT;