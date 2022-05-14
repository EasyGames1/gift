import React, { useEffect, useState } from 'react';
import Storage from '../../../API/Storage';
import Formatting from '../../../API/Formatting';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
import List from '../List/List';
import Modal from '../Modal/Modal';
import Textarea from '../Textarea/Textarea';
import classes from './MyDishes.module.css';
import { useNavigate } from 'react-router-dom';

const MyDishes = (props) => {
    const navigate = useNavigate();
    const [transfAdded, setTransfAdded] = useState('no');
    const [modal, setModal] = useState(false);
    const [modalTransf, setModalTransf] = useState(false);
    const [deleteDish, setDeleteDish] = useState(false);
    const [current, setCurrent] = useState('');
    const [dishes, setDishes] = useState(Storage.getUserData('data')?.extended?.cooking?.dishes || []);
    const [editCurrent, setEditCurrent] = useState('');
    const [editLast, setEditLast] = useState('');
    const [highlight, setHighlight] = useState({
        ingr: false,
        steps: false
    });

    useEffect(() => {
        if (!modalTransf) {
            setTransfAdded("no");
        };
    }, [modalTransf]);

    useEffect(() => {
        if (transfAdded === "OK" || transfAdded === "edited") {
            setModal(false);
            setModalTransf(true);
        } else if (transfAdded !== "no") {
            setModalTransf(false);
            setModal(true);
        };
    }, [transfAdded]);

    useEffect(() => {
        if (highlight.ingr) {
            setEditCurrent({
                type: 'ingr',
                index: dishes[current]?.ingridients?.length - 1
            });
            setTimeout(() => {
                setHighlight({
                    ...highlight,
                    ingr: false
                });
            }, 1500);
        };
        if (highlight.steps) {
            setEditCurrent({
                type: 'steps',
                index: dishes[current]?.steps?.length - 1
            });
            setTimeout(() => {
                setHighlight({
                    ...highlight,
                    steps: false
                });
            }, 1500);
        };
    }, [highlight]);

    useEffect(() => {
        if (props.needToResetMyDishes) {
            setDishes(Storage.getUserData('data')?.extended?.cooking?.dishes || []);
            props.setNeedToResetMyDishes(false);
        };
    }, [props.needToResetMyDishes]);

    useEffect(() => {
        setEditCurrent('');
    }, [modal]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    dishes: dishes.map((dish) => dish && {
                        ...dish,
                        name: dish?.name,
                        description: dish?.description,
                        ingridients: dish?.ingridients?.filter((ingr) => !/^\s*$/.test(ingr)),
                        steps: dish?.steps?.filter((step) => !/^\s*$/.test(step))
                    })
                }
            }
        });
    }, [dishes]);

    useEffect(() => {
        if (editCurrent !== '') {
            setEditLast(editCurrent);
        };
        if (editCurrent === '' || editCurrent?.type !== editLast?.type) {
            switch (editLast?.type) {
                case 'ingr':
                    if (/^\s*$/.test(dishes[current]?.ingridients[editLast?.index])) {
                        setDishes(
                            dishes?.map((dish, i) => i === current ? {
                                ...dish,
                                ingridients: dishes[current]?.ingridients?.filter((s, x) => x !== editLast?.index)
                            } : dish)
                        );
                    };
                    break;
                case 'steps':
                    if (/^\s*$/.test(dishes[current]?.steps[editLast?.index])) {
                        setDishes(
                            dishes?.map((dish, i) => i === current ? {
                                ...dish,
                                steps: dishes[current]?.steps?.filter((s, x) => x !== editLast?.index)
                            } : dish)
                        )
                    };
                    break;
                case 'name':
                    if (/^\s*$/.test(dishes[current]?.name)) {
                        setDishes(
                            dishes?.map((dish, i) => i === current ? {
                                ...dish,
                                name: /^\s*$/.test(dishes[current].name) ? "Блюдо без названия" : dishes[current].name
                            } : dish)
                        );
                    };
                    break;
            };
        };
    }, [editCurrent]);

    return (
        <div>
            <h1 className='text-center mb-4 mt-3'>Мои блюда</h1>
            <List
                clickable
                theme={props.theme}
            >
                {
                    dishes?.map((dish, index) =>
                        <li
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onClick={(e) => {
                                //Не работает удаление
                                e.stopPropagation();
                                setCurrent(index);
                                setModal(true);
                            }}
                            key={index}
                        >
                            {dish?.name}
                            <IconButton
                                style={{ color: 'red', filter: 'invert(0)' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrent(index);
                                    if (props.deleteRecipesConfirm) {
                                        setDeleteDish(true);
                                    } else {
                                        setDishes(dishes.filter((s, i) => i !== current));
                                    };
                                }}
                            >
                                delete
                            </IconButton>
                        </li>
                    )
                }

            </List>
            <Modal
                visible={deleteDish}
                setVisible={setDeleteDish}
                title="Подтверждение"
                theme={props.theme}
                footer={`Удалить ${dishes[current]?.name}`}
                onAccept={() => {
                    setDishes(dishes.filter((s, i) => i !== current));
                    setDeleteDish(false);
                }}
                footerRed
            >
                <h4 style={{ maxWidth: '500px', fontWeight: '400' }}>
                    Вы действительно хотите удалить
                    <div className='mt-2' style={{ fontWeight: '500' }}>
                        {dishes[current]?.name}
                        <span style={{ fontWeight: '400' }}>?</span>
                    </div>
                </h4>
            </Modal>

            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title={
                    editCurrent?.type === 'name' ?
                        <div className={classes.edit}>
                            <Input
                                theme={props.theme}
                                autoFocus
                                value={dishes[current]?.name}
                                onChange={(e) => {
                                    setDishes(
                                        dishes?.map((dish, i) => i === current ? {
                                            ...dish,
                                            name: e.target.value
                                        } : dish)
                                    );
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setEditCurrent('');
                                    };
                                }}
                            />
                            <IconButton
                                theme={props.theme}
                                onClick={() => setEditCurrent('')}
                            >
                                keyboard_double_arrow_right
                            </IconButton>

                        </div>
                        :
                        <span
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            {dishes[current]?.name}
                            <IconButton
                                theme={props.theme}
                                style={{ color: '#4361ee', filter: 'invert(0%)', margin: 'auto', marginLeft: '5px' }}
                                onClick={() => {
                                    setEditCurrent({
                                        type: 'name',
                                        index: 0
                                    });
                                }}
                            >
                                edit
                            </IconButton>
                        </span>
                }
                big

            >
                <div style={{ maxWidth: '500px', margin: 'auto' }}>
                    {
                        dishes[current]?.ingridients &&
                        <>
                            <h3 className='text-center mb-3'>Ингридиенты</h3>
                            <div className="text-center mb-3">
                                <Button
                                    onClick={() => {
                                        if (!/^\s*$/.test(dishes[current]?.ingridients[dishes[current]?.ingridients?.length - 1])) {
                                            setDishes(
                                                dishes.map((dish, i) => i === current ?
                                                    {
                                                        ...dish,
                                                        ingridients: [...dish.ingridients, '']
                                                    }
                                                    : dish)
                                            );
                                            setEditCurrent({
                                                type: 'ingr',
                                                index: dishes[current]?.ingridients?.length
                                            });
                                        } else {
                                            if (!highlight.ingr && !highlight.steps) {
                                                setHighlight({
                                                    ...highlight,
                                                    ingr: true
                                                });
                                            };
                                        };
                                    }}
                                >
                                    Добавить ингридиент
                                </Button>
                            </div>
                            <List
                                theme={props.theme}
                            >
                                {
                                    dishes[current]?.ingridients?.map((ingr, index) =>
                                        <div key={index}>
                                            {
                                                (editCurrent?.type === 'ingr' &&
                                                    editCurrent?.index !== index ||
                                                    editCurrent?.type !== 'ingr') &&
                                                <li className={`${classes.ingr} ${index === dishes[current]?.ingridients.length - 1 ? highlight.ingr ? classes.highlight : '' : ''}`}>
                                                    <>
                                                        <div>
                                                            {ingr}
                                                        </div>
                                                        <div className={classes.icons}>
                                                            <IconButton
                                                                theme={props.theme}
                                                                style={{ color: '#4361ee', filter: 'invert(0%)' }}
                                                                onClick={() =>
                                                                    setEditCurrent({
                                                                        type: 'ingr',
                                                                        index: index
                                                                    })
                                                                }
                                                            >
                                                                edit
                                                            </IconButton>
                                                            <IconButton
                                                                theme={props.theme}
                                                                style={{ color: 'rgb(255, 0, 0)', filter: 'invert(0%)' }}
                                                                onClick={() => {
                                                                    setDishes(
                                                                        dishes?.map((dish, i) => i === current ? {
                                                                            ...dish,
                                                                            ingridients: dishes[current]?.ingridients?.filter((s, x) => x !== index)
                                                                        } : dish)
                                                                    )
                                                                }}
                                                            >
                                                                delete
                                                            </IconButton>
                                                        </div>
                                                    </>
                                                </li>
                                            }
                                            {
                                                editCurrent?.type === 'ingr' &&
                                                editCurrent?.index === index &&
                                                <li className={classes.edit}>
                                                    <Input
                                                        theme={props.theme}
                                                        autoFocus
                                                        value={dishes[current]?.ingridients[index]}
                                                        onChange={(e) => {
                                                            setDishes(
                                                                dishes?.map((dish, i) => i === current ? {
                                                                    ...dish,
                                                                    ingridients: dishes[current]?.ingridients?.map((s, x) => x === index ? e.target.value : s)
                                                                } : dish)
                                                            )
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                setEditCurrent('');
                                                            };
                                                        }}
                                                        highlight={highlight?.ingr}
                                                    />
                                                    <IconButton
                                                        theme={props.theme}
                                                        onClick={() => setEditCurrent('')}
                                                    >
                                                        keyboard_double_arrow_right
                                                    </IconButton>
                                                </li>
                                            }
                                        </div>
                                    )
                                }
                            </List>
                            {
                                dishes[current]?.ingridients?.filter((ingr) => !/^\s*$/.test(ingr))?.length > 0 &&
                                <div className="text-center">
                                    <Button
                                        onClick={() => {
                                            if (Storage.getUserData('data')?.extended?.shoplist?.mylists.map((tab) =>
                                                tab.title === Formatting.fBig(dishes[current]?.name)).includes(true)) {
                                                Storage.setUserData('data', {
                                                    ...Storage.getUserData('data'),
                                                    extended: {
                                                        ...Storage.getUserData('data')?.extended,
                                                        shoplist: {
                                                            ...Storage.getUserData('data')?.extended?.shoplist,
                                                            mylists:
                                                                Storage.getUserData('data')?.extended?.shoplist?.mylists?.map((el, i) => el.title === dishes[current]?.name ?
                                                                    {
                                                                        title: el.title,
                                                                        shoplist: dishes[current]?.ingridients?.map((item, x) => item &&
                                                                        {
                                                                            name: item,
                                                                            price: 0,
                                                                            count: 1
                                                                        }
                                                                        )
                                                                    } : el)
                                                        }
                                                    }
                                                });
                                                setTransfAdded("edited");
                                                return;
                                            };
                                            Storage.setUserData('data', {
                                                ...Storage.getUserData('data'),
                                                extended: {
                                                    ...Storage.getUserData('data')?.extended,
                                                    shoplist: {
                                                        ...Storage.getUserData('data')?.extended?.shoplist,
                                                        mylists: Storage.getUserData('data')?.extended?.shoplist?.mylists ?
                                                            [...Storage.getUserData('data')?.extended?.shoplist?.mylists, {
                                                                title: Formatting.fBig(dishes[current]?.name),
                                                                shoplist: dishes[current]?.ingridients?.filter((w) => !/^\s*$/.test(w)).map((el) => el && {
                                                                    name: Formatting.fBig(el),
                                                                    price: 0,
                                                                    count: 1
                                                                })
                                                            }]
                                                            : [{
                                                                title: Formatting.fBig(dishes[current]?.name),
                                                                shoplist: dishes[current]?.ingridients?.filter((w) => !/^\s*$/.test(w)).map((el) => el && {
                                                                    name: Formatting.fBig(el),
                                                                    price: 0,
                                                                    count: 1
                                                                })
                                                            }]
                                                    }
                                                }
                                            });
                                            setTransfAdded("OK");
                                        }}
                                    >
                                        Перенести в список покупок
                                    </Button>
                                </div>
                            }
                        </>
                    }
                    {
                        dishes[current]?.steps &&
                        <>
                            <h3 className='text-center mb-3 mt-3'>Рецепт</h3>
                            <div className="text-center mb-3">
                                <Button
                                    onClick={() => {
                                        if (!/^\s*$/.test(dishes[current]?.steps[dishes[current]?.steps?.length - 1])) {
                                            setDishes(
                                                dishes.map((dish, i) => i === current ?
                                                    {
                                                        ...dish,
                                                        steps: [...dish.steps, '']
                                                    }
                                                    : dish)
                                            );
                                            setEditCurrent({
                                                type: 'steps',
                                                index: dishes[current]?.steps?.length
                                            });
                                        } else {
                                            if (!highlight.steps && !highlight.ingr) {
                                                setHighlight({
                                                    ...highlight,
                                                    steps: true
                                                });
                                            };
                                        };
                                    }}
                                >
                                    Добавить шаг
                                </Button>
                            </div>
                            <List
                                theme={props.theme}
                            >
                                {
                                    dishes[current]?.steps?.map((step, index) =>
                                        <div key={index}>
                                            {
                                                (editCurrent?.type === 'steps' &&
                                                    editCurrent?.index !== index ||
                                                    editCurrent?.type !== 'steps') &&
                                                <li
                                                    className={`${classes.ingr} ${index === dishes[current]?.steps.length - 1 ? highlight.steps ? classes.highlight : '' : ''}`}
                                                    key={index}
                                                >
                                                    <div>
                                                        {step}
                                                    </div>
                                                    <div className={classes.icons}>
                                                        <IconButton
                                                            theme={props.theme}
                                                            style={{ color: '#4361ee', filter: 'invert(0%)' }}
                                                            onClick={() =>
                                                                setEditCurrent({
                                                                    type: 'steps',
                                                                    index: index
                                                                })
                                                            }
                                                        >
                                                            edit
                                                        </IconButton>
                                                        <IconButton
                                                            theme={props.theme}
                                                            style={{ color: 'rgb(255, 0, 0)', filter: 'invert(0%)' }}
                                                            onClick={() => {
                                                                setDishes(
                                                                    dishes?.map((dish, i) => i === current ? {
                                                                        ...dish,
                                                                        steps: dishes[current]?.steps?.filter((s, x) => x !== index)
                                                                    } : dish)
                                                                )
                                                            }}
                                                        >
                                                            delete
                                                        </IconButton>
                                                    </div>
                                                </li>
                                            }
                                            {
                                                editCurrent?.type === 'steps' &&
                                                editCurrent?.index === index &&
                                                <li className={classes.edit}>
                                                    <Input
                                                        theme={props.theme}
                                                        autoFocus
                                                        value={dishes[current]?.steps[index]}
                                                        onChange={(e) => {
                                                            setDishes(
                                                                dishes?.map((dish, i) => i === current ? {
                                                                    ...dish,
                                                                    steps: dishes[current]?.steps?.map((s, x) => x === index ? e.target.value : s)
                                                                } : dish)
                                                            )
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                setEditCurrent('');
                                                            };
                                                        }}
                                                        highlight={highlight?.steps}
                                                    />
                                                    <IconButton
                                                        theme={props.theme}
                                                        onClick={() => setEditCurrent('')}
                                                    >
                                                        keyboard_double_arrow_right
                                                    </IconButton>
                                                </li>
                                            }
                                        </div>
                                    )
                                }

                            </List>
                        </>
                    }
                    <h3 className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Описание
                        {
                            editCurrent?.type !== 'desc' ?
                                <IconButton
                                    theme={props.theme}
                                    style={{ color: '#4361ee', filter: 'invert(0%)' }}
                                    onClick={() => setEditCurrent({
                                        type: 'desc',
                                        index: 0
                                    })}
                                >
                                    edit
                                </IconButton>
                                :
                                <IconButton
                                    theme={props.theme}
                                    style={{ fontSize: '28px' }}
                                    onClick={() => setEditCurrent('')}
                                >
                                    keyboard_double_arrow_right
                                </IconButton>
                        }
                    </h3>

                    {
                        editCurrent?.type === 'desc'
                            ?
                            <div className="text-center">
                                <Textarea
                                    className='mt-3 w-100'
                                    style={{ height: '150px' }}
                                    theme={props.theme}
                                    value={dishes[current]?.description}
                                    onChange={(e) => {
                                        setDishes(
                                            dishes?.map((dish, i) => i === current ? {
                                                ...dish,
                                                description: e.target.value
                                            } : dish)
                                        )
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.ctrlKey && e.key === 'Enter') {
                                            setEditCurrent('');
                                        };
                                    }}
                                    autoFocus
                                />
                            </div>
                            :
                            <span className='text-center' style={{ fontSize: "1.2rem", fontWeight: "400", whiteSpace: 'pre-line' }}>
                                {dishes[current]?.description ? dishes[current]?.description : "Нет описания"}
                            </span>
                    }
                </div>
            </Modal >
            <Modal
                theme={props.theme}
                visible={modalTransf}
                setVisible={setModalTransf}
                title="Подтверждение"
                footer="Вернуться"
                onAccept={() => {
                    setModalTransf(false);
                    setModal(true);
                }}
                footer2={transfAdded === "OK" || transfAdded === "edited" ? "К покупкам" : false}
                f2Accept={() => {
                    navigate("/projects/shoplist");
                }}
            >
                <div className="mw500">
                    <h5>
                        {
                            transfAdded === "OK" &&
                            "Блюдо успешно перенесено в список покупок."
                        }
                        {
                            transfAdded === "edited" &&
                            "Блюдо успешно изменено в списке покупок."
                        }
                    </h5>
                </div>
            </Modal>
        </div >
    );
};

export default MyDishes;