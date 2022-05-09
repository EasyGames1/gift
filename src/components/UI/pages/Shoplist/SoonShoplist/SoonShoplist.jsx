import React, { useState, useEffect } from 'react';
import classes from './SoonShoplist.module.css';
import List from '../../../List/List';
import InputPlaceholder from '../../../InputPlaceholder/InputPlaceholder';
import Storage from '../../../../../API/Storage';
import Formatting from '../../../../../API/Formatting';
import IconButton from '../../../IconButton/IconButton';
import Button from '../../../Button/Button';
import Modal from '../../../Modal/Modal';

const SoonShoplist = (props) => {
    const [modal, setModal] = useState(false);
    const [modalAccept, setModalAccept] = useState(false);
    const [isAdding, setIsAdding] = useState(props.newPurchase);
    const [current, setCurrent] = useState(0);
    const [currentItem, setCurrentItem] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [list, setList] = useState(
        Storage.getUserData('data')?.extended?.shoplist?.soon ?
            Storage.getUserData('data')?.extended?.shoplist?.soon : []);
    const [highlight, setHighlight] = useState('');

    const add = () => {
        if (/^\s*$/.test(name)) {
            setHighlight(0);
            return;
        };
        if (/^\s*$/.test(price) || price === ".") {
            setHighlight(1);
            return;
        };
        setList([...Storage.getUserData('data')?.extended?.shoplist?.soon, {
            name: Formatting.fBig(name),
            price: price,
            count: !/^\s*$/.test(count) ? count : 1
        }]);
        setName('');
        setPrice('');
        setCount('');
        setCurrent(0);
    };

    useEffect(() => {
        if (!modal) {
            setCurrentItem('');
        };
    }, [modal]);

    useEffect(() => {
        if (currentItem !== '') {
            setModal(true);
        };
    }, [currentItem]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                shoplist: {
                    ...Storage.getUserData('data')?.extended?.shoplist,
                    soon: list
                }
            }
        })
    }, [list]);

    useEffect(() => {
        if (highlight !== '') {
            setCurrent(highlight);
            setTimeout(() => {
                setHighlight('');
                setCurrent(highlight)
            }, 1500);
        };
    }, [highlight]);
    return (
        <>
            {
                !props?.hidden?.includes("Будущие покупки") &&
                <div className={`${classes.soonShoplist} ${classes[props.theme]}`}>
                    <h3 className='jcsb mb-3 mt-3'>
                        Будущие покупки
                        <div className='jcsb'>
                            <IconButton
                                theme={props.theme}
                                onClick={() =>
                                    props.hidden?.map((tab) => tab?.includes("Будущие покупки")).includes(true) ?
                                        props.setHidden(props.hidden.filter((tab) => tab !== "Будущие покупки")) :
                                        props.setHidden([...props.hidden.filter((tab) => tab !== "Будущие покупки"), "Будущие покупки"])
                                }
                                title="Скрыть будущие покупки"
                                style={{ marginRight: '5px' }}
                            >
                                visibility_off
                            </IconButton>
                            {
                                list.length === 0 && !isAdding ?
                                    <Button onClick={() => setIsAdding(true)}>Добавить первую покупку</Button>
                                    :
                                    <IconButton
                                        theme={props.theme}
                                        style={!isAdding ? { color: '#37911f', filter: 'invert(0%)' } : { color: '#ba0000', filter: 'invert(0%)' }}
                                        onClick={() => setIsAdding(!isAdding)}
                                        title={!isAdding ? "Новая покупка" : "Не добавлять новую покупку"}
                                    >
                                        {
                                            !isAdding ?
                                                "add_shopping_cart" :
                                                "remove_shopping_cart"
                                        }
                                    </IconButton>
                            }
                        </div>
                    </h3>
                    {
                        isAdding &&
                        <div className={`${classes.addForm} ${classes[props.theme]}`}>
                            <h3 className="mb-3 jcsb">
                                Новая покупка
                                <IconButton
                                    theme={props.theme}
                                    style={{ color: "#37911F", filter: "invert(0%)" }}
                                    onClick={add}
                                >
                                    done
                                </IconButton>
                            </h3>
                            <InputPlaceholder
                                highlight={highlight === 0}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus={current === 0 || highlight === 0}
                                theme={props.theme}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setCurrent(1);
                                    };
                                    if (e.key === "Backspace") {
                                        if (e.target.value === "") {
                                            setIsAdding(false);
                                        };
                                    };
                                }}
                                placeholder="Название"
                                bg={props.theme === "dark" ? "#191919" : "#fff"}
                            />
                            <InputPlaceholder
                                highlight={highlight === 1}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                autoFocus={current === 1 || highlight === 1}
                                theme={props.theme}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setCurrent(2);
                                    };
                                    if (e.key === "Backspace") {
                                        if (e.target.value === "") {
                                            setCurrent(0);
                                        };
                                    };
                                }}
                                placeholder="Цена"
                                bg={props.theme === "dark" ? "#191919" : "#fff"}
                                type="number"
                            />
                            <InputPlaceholder
                                highlight={highlight === 2}
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                autoFocus={current === 2 || highlight === 2}
                                theme={props.theme}

                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setCurrent('');
                                        add();
                                    };
                                    if (e.key === "Backspace") {
                                        if (e.target.value === "") {
                                            setCurrent(1);
                                        };
                                    };
                                }}
                                placeholder="Количество"
                                bg={props.theme === "dark" ? "#191919" : "#fff"}
                                type="number"
                            />
                        </div>
                    }
                    {
                        list.length > 0 &&
                        <>
                            <List theme={props.theme} clickable>
                                {list?.map((item, index) =>
                                    <li
                                        key={index}
                                        className="jcsb"
                                        onClick={() => setCurrentItem(index)}
                                    >
                                        <span>{Formatting.fBig(item?.name)}</span>
                                        <div className='jcsb' style={{ wordBreak: "break-all", maxWidth: "50%", minWidth: '100px' }}>
                                            <span className={classes.itemSubInfo}>
                                                <span>{item?.price}x</span>
                                                <span>{item?.count}</span>
                                            </span>
                                            <span className='jcsb'>
                                                {item?.count * item?.price} ₽
                                                <IconButton
                                                    style={{ color: "#BA0000", filter: "invert(0%)" }}
                                                    onClick={(e) => { e.stopPropagation(); setList(list.filter((item, i) => i !== index)) }}
                                                >
                                                    delete
                                                </IconButton>
                                            </span>
                                        </div>
                                    </li>
                                )}
                            </List>
                            <h3 className='mw500 jcsb mb-3'>
                                <div>
                                    {list.length} {Formatting.declOfNum(list.length, ['покупка', 'покупки', 'покупок'])} на&nbsp;
                                    {
                                        list.map((item) => item.price * item.count).reduce((prev, next) => prev + next)
                                    } ₽
                                </div>
                                <Button
                                    red
                                    onClick={() => setModalAccept(true)}
                                >
                                    Удалить все покупки
                                </Button>
                            </h3>
                        </>
                    }
                    <Modal
                        theme={props.theme}
                        visible={modal}
                        setVisible={setModal}
                        title={currentItem !== '' && list[currentItem]?.name}
                    >
                        <div className={classes.itemModalInfo}>
                            <h5>
                                <InputPlaceholder
                                    value={list[currentItem]?.price}
                                    onChange={(e) => setList(list.map((item, index) => index === currentItem ? { ...item, price: e.target.value } : item))}
                                    theme={props.theme}
                                    placeholder="Цена"
                                    bg={props.theme === "dark" ? "#202020" : "#fff"}
                                    type="number"
                                />
                                <InputPlaceholder
                                    value={list[currentItem]?.count}
                                    onChange={(e) => setList(list.map((item, index) => index === currentItem ? { ...item, count: e.target.value } : item))}
                                    theme={props.theme}
                                    placeholder="Количество"
                                    bg={props.theme === "dark" ? "#202020" : "#fff"}
                                    type="number"
                                />
                            </h5>
                            <h5 className="jcsb">
                                <span>Стоимость</span>
                                <span>{currentItem !== '' && list[currentItem]?.price * list[currentItem]?.count} ₽</span>
                            </h5>
                        </div>
                    </Modal>
                    <Modal
                        theme={props.theme}
                        visible={modalAccept}
                        setVisible={setModalAccept}
                        title="Подтверждение"
                        footerRed
                        footer="Подтвердить"
                        onAccept={() => {
                            setList([]);
                            setModalAccept(false);
                        }}
                    >
                        <div className="mw500">
                            <h3>Вы уверены, что хотите удалить список запланированных покупок?</h3>
                        </div>
                    </Modal>
                </div>
            }
        </>
    );
};

export default SoonShoplist;