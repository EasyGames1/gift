import React, { useState } from 'react';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';

const Ingridients = (props) => {
    const [warningDeleteAll, setWarningDeleteAll] = useState(false);
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.ingridients?.map((step, index) =>
                    <div key={index} className="mt-2">
                        <h5 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            Ингридиент {index + 1}
                            <IconButton
                                theme={props.theme}
                                style={{ color: "red", filter: "invert(0%)" }}
                                onClick={() => {
                                    props.setIngridients(props.ingridients.filter((s, i) => index !== i));
                                }}
                            >
                                delete
                            </IconButton>
                        </h5>
                        <Input
                            value={props.ingridients[index]}
                            onChange={(e) => {
                                props.setIngridients(props.ingridients.map((s, i) => index === i ? e.target.value : props.ingridients[i]));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    props.addIngr();
                                };
                                if (e.key === "Delete") {
                                    props.setIngridients(props.ingridients.filter((s, i) => index !== i));
                                };
                            }}
                            theme={props.theme}
                            className="mt-3 w-100"
                            autoFocus={index + 1 === props.ingridients.length}
                            highlight={props.helpingFindInputIngr && index + 1 === props.ingridients.length}
                        />
                        {
                            index === props.ingridients.length - 1 &&
                            <div className="row mt-2 w-70 m-auto">
                                <Button
                                    className="col-5"
                                    onClick={() => {
                                        props.addIngr();
                                    }}
                                >
                                    Добавить ингридиент
                                </Button>
                                <div className="col-2"></div>
                                <Button
                                    className="col-5"
                                    red
                                    onClick={() => setWarningDeleteAll(true)}
                                >
                                    Удалить ингридиенты
                                </Button>
                            </div>
                        }
                    </div>
                )
            }
            <Modal
                visible={warningDeleteAll}
                setVisible={setWarningDeleteAll}
                theme={props.theme}
                title="Подтверждение"
                footer="Да, удалить все ингридиенты"
                footerRed
                onAccept={() => {
                    props.setIngridients([]);
                    setWarningDeleteAll(false);
                }}
            >
                <h3 style={{ maxWidth: '500px' }}>Вы действительно хотите удалить все ингридиенты?</h3>
            </Modal>
        </div>
    );
};

export default Ingridients;