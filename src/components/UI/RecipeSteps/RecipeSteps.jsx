import React, { useState } from 'react';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';

const RecipeSteps = (props) => {
    const [warningDeleteAll, setWarningDeleteAll] = useState(false);    

    return (
        <div className={`${props.className || ''}`}>
            {
                props.steps?.map((step, index) =>
                    <div key={index} className="mt-2">
                        <h5 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            Шаг {index + 1}
                            <IconButton
                                theme={props.theme}
                                style={{color: "red", filter: "invert(0%)"}}
                                onClick={() => {
                                    props.setSteps(props.steps.filter((s, i) => index !== i));
                                }}
                            >
                                delete
                            </IconButton>
                        </h5>
                        <Input
                            value={props.steps[index]}
                            onChange={(e) => {
                                props.setSteps(props.steps.map((s, i) => index === i ? e.target.value : props.steps[i]));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    props.addStep();
                                };
                                if (e.key === "Delete") {
                                    props.setSteps(props.steps.filter((s, i) => index !== i));
                                };
                            }}
                            theme={props.theme}
                            className="mt-3 w-100"
                            autoFocus={index + 1 === props.steps.length}
                            highlight={props.helpingFindInputSteps && index + 1 === props.steps.length}
                        />
                        {
                            index === props.steps.length - 1 &&
                            <div className="row mt-2 w-70 m-auto">
                                <Button
                                    className="col-5"
                                    onClick={props.addStep}
                                >
                                    Добавить шаг
                                </Button>
                                <div className="col-2"></div>
                                <Button
                                    className="col-5"
                                    red
                                    onClick={() => setWarningDeleteAll(true)}
                                >
                                    Удалить рецепт
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
                footer="Да, удалить рецепт"
                footerRed
                onAccept={() => {
                    props.setSteps([]);
                    setWarningDeleteAll(false);
                }}
            >
                <h3 style={{maxWidth: '500px'}}>Вы действительно хотите удалить весь рецепт?</h3>
            </Modal>
        </div>
    );
};

export default RecipeSteps;