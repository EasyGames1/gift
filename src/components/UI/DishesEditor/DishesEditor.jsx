import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import classes from './DishesEditor.module.css';
import Input from '../Input/Input';
import Storage from '../../../API/Storage';
import RecipeSteps from '../RecipeSteps/RecipeSteps';
import Ingridients from '../Ingridients/Ingridients';
import Textarea from '../Textarea/Textarea';
import Modal from '../Modal/Modal';
import List from '../List/List';
import Formatting from '../../../API/Formatting';

const isActiveData = {
    'new': {
        title: 'Создание нового блюда',

    },
    'edit': {
        title: 'Изменение существующего блюда'
    },
    'ready': {
        title: 'Доработка готового блюда',
    }
};

const DishesEditor = (props) => {
    const [helpingFindInputStep, setHelpingFindInputStep] = useState(false);
    const [helpingFindInputIngr, setHelpingFindInputIngr] = useState(false);
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [nothing, setNothing] = useState(false);
    const saveDish = (skipValidation) => {
        if (!skipValidation && /^\s*$/.test(name) && /^\s*$/.test(description) && ingridients.length === 0 && steps.length === 0) {
            setNothing(true);
            return false;
        };
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    dishes:
                        Storage.getUserData('data')?.extended?.cooking?.dishes != null ?
                            [
                                ...Storage.getUserData('data')?.extended?.cooking?.dishes,
                                {
                                    name: !/^\s*$/.test(name) ? Formatting.fBig(name) : "Блюдо без названия",
                                    ingridients: ingridients.map((ingr) => Formatting.fBig(ingr)).filter((ingr) => !/^\s*$/.test(ingr)),
                                    steps: steps.map((step) => Formatting.fBig(step)).filter((step) => !/^\s*$/.test(step)),
                                    description: Formatting.fBig(description) || "Нет описания"
                                }
                            ]
                            :
                            [
                                {
                                    name: !/^\s*$/.test(name) ? Formatting.fBig(name) : "Блюдо без названия",
                                    ingridients: ingridients.map((ingr) => Formatting.fBig(ingr)).filter((ingr) => !/^\s*$/.test(ingr)),
                                    steps: steps.map((step) => Formatting.fBig(step)).filter((step) => !/^\s*$/.test(step)),
                                    description: Formatting.fBig(description) || "Нет описания"
                                }
                            ]
                }
            }
        });
        setName('');
        setIngridients([]);
        setSteps([]);
        setDescription('');
        props.setNeedToResetMyDishes(true);
    };
    const addIngr = () => {
        if (!/^\s*$/.test(ingridients[ingridients.length - 1])) {
            setIngridients([...ingridients, '']);
            setHelpingFindInputIngr(false);
        } else {
            if (!helpingFindInputIngr) {
                setHelpingFindInputIngr(true);
                setTimeout(() => {
                    setHelpingFindInputIngr(false);
                }, 1500);
            };
        };
    };
    const addStep = () => {
        if (!/^\s*$/.test(steps[steps.length - 1])) {
            setSteps([...steps, '']);
            setHelpingFindInputStep(false);
        } else {
            if (!helpingFindInputStep) {
                setHelpingFindInputStep(true);
                setTimeout(() => {
                    setHelpingFindInputStep(false);
                }, 1500);
            };
        };
    };
    const [isActive, setIsActive] = useState(props.recipesEditorDefault);
    const [name, setName] = useState(
        Storage.getUserData('data')?.extended?.cooking?.name ?
            Storage.getUserData('data')?.extended?.cooking?.name :
            '',
    );
    const [steps, setSteps] = useState(
        Storage.getUserData('data')?.extended?.cooking?.steps ?
            Storage.getUserData('data')?.extended?.cooking?.steps :
            [],
    );
    const [ingridients, setIngridients] = useState(
        Storage.getUserData('data')?.extended?.cooking?.ingridients ?
            Storage.getUserData('data')?.extended?.cooking?.ingridients :
            [],
    );
    const [description, setDescription] = useState(
        Storage.getUserData('data')?.extended?.cooking?.description ?
            Storage.getUserData('data')?.extended?.cooking?.description :
            '',
    );

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    steps:
                        steps === '' ?
                            Storage.getUserData('data')?.extended?.cooking?.steps :
                            steps.map((step) => Formatting.fBig(step)),
                }
            }
        });
        if (helpingFindInputStep) {
            setHelpingFindInputStep(false);
        };
    }, [steps]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    ingridients:
                        ingridients === '' ?
                            Storage.getUserData('data')?.extended?.cooking?.ingridients :
                            ingridients.map((ingr) =>  Formatting.fBig(ingr)),
                }
            }
        });
        if (helpingFindInputIngr) {
            setHelpingFindInputIngr(false);
        };
    }, [ingridients]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    description: Formatting.fBig(description)
                }
            }
        });
    }, [description]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    name: Formatting.fBig(name)
                }
            }
        });
    }, [name]);

    return (
        <div>
            <div className="container">
                {
                    !isActive ?
                        <div className='text-center'>
                            <Button
                                onClick={() => setIsActive(true)}
                            >
                                Добавить новое
                            </Button>
                        </div>
                        :
                        <>
                            <div className="text-center mt-4 mb-4">
                                <Button
                                    onClick={() => setIsActive(false)}
                                >
                                    Закрыть редактор
                                </Button>
                            </div>
                            <div className={`${classes.editor} ${classes[props.theme]}`}>
                                <h3 className='text-center'>{isActiveData.title}</h3>
                                <h4 className={classes.name}>
                                    Название блюда
                                    <Input
                                        theme={props.theme}
                                        type='text'
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </h4>
                                <h4 className={classes.name}>Ингридиенты
                                    <Button onClick={addIngr}
                                    >Добавить ингридиент</Button>
                                </h4>
                                <Ingridients
                                    className="mt-3"
                                    ingridients={ingridients}
                                    setIngridients={setIngridients}
                                    isActive={isActive}
                                    theme={props.theme}
                                    addIngr={addIngr}
                                    helpingFindInputIngr={helpingFindInputIngr}
                                />
                                <h4 className={classes.name}>Рецепт
                                    <Button onClick={addStep}>Добавить шаг</Button>
                                </h4>
                                <RecipeSteps
                                    className="mt-3"
                                    steps={steps}
                                    setSteps={setSteps}
                                    isActive={isActive}
                                    theme={props.theme}
                                    addStep={addStep}
                                    helpingFindInputSteps={helpingFindInputStep}
                                />
                                <h4 className={classes.name}>Описание</h4>
                                <Textarea
                                    className='mt-3 w-100'
                                    style={{ height: '150px' }}
                                    theme={props.theme}
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                                <Button onClick={() => setDataIsCorrect(true)} className="w-100">Сохранить</Button>
                            </div>
                        </>
                }
            </div>
            <Modal
                visible={dataIsCorrect}
                setVisible={setDataIsCorrect}
                title="Подтверждение"
                theme={props.theme}
                footer="Подтвердить"
                onAccept={() => {
                    saveDish();
                    setDataIsCorrect(false);
                }}
                big
            >
                <h1 className='text-center' style={{ maxWidth: '500px', margin: 'auto' }}>{Formatting.fBig(name)}</h1>
                <h4 className='text-center mt-3 mb-3' style={{ maxWidth: '500px', margin: 'auto' }}>{Formatting.fBig(description)}</h4>
                {
                    ingridients?.length > 0 ?
                    <>
                        <h4 className='text-center mt-3 mb-3'>Ингридиенты</h4>
                        <List
                            theme={props.theme}
                            style={{ maxWidth: '500px', margin: 'auto' }}
                        >
                            {ingridients?.map((ingr, index) => !/^\s*$/.test(ingr) ?
                                <li key={index}>
                                    {Formatting.fBig(ingr)}
                                </li> : ''
                            )}
                        </List>
                    </> : <h4 className='text-center mb-3'>Нет ингридиентов</h4>
                }
                {
                    steps?.length > 0 ?
                    <>
                        <h4 className='text-center mb-4'>Рецепт</h4>
                        <List
                            theme={props.theme}
                            style={{ maxWidth: '500px', margin: 'auto' }}
                        >
                            {steps?.map((step, index) => !/^\s*$/.test(step) ?
                                <li key={index}>
                                    {Formatting.fBig(step)}
                                </li> : ''
                            )}
                        </List>
                    </> : <h4 className='text-center mb-3'>Нет рецепта</h4>
                }
            </Modal>
            <Modal
                theme={props.theme}
                visible={nothing}
                setVisible={setNothing}
                title="Предупреждение"
                footer="Всё равно сохранить"
                footerRed
                onAccept={() => {
                    saveDish(true);
                    setNothing(false);
                }}
            >
                <div style={{ maxWidth: '500px' }}>
                    <h3 className='mb-3'>Пустое блюдо</h3>
                    <h5>Вы хотите сохранить пустое блюдо.</h5>
                </div>
            </Modal>
        </div>
    );
};

export default DishesEditor;