import React, { useEffect, useState } from 'react';
import Storage from '../../../../../API/Storage';
import IconButton from '../../../IconButton/IconButton';
import Modal from '../../../Modal/Modal';
import classes from './MyShoplistsData.module.css';
import List from '../../../List/List';
import Button from '../../../Button/Button';
import InputPlaceholder from '../../../InputPlaceholder/InputPlaceholder';
import Formatting from '../../../../../API/Formatting';

const MyShoplistsData = (props) => {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAccept, setModalAccept] = useState(false);
    const [acceptIndex, setAcceptIndex] = useState('');
    const [current, setCurrent] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [currentEdit, setCurrentEdit] = useState('');
    const [isAdding, setIsAdding] = useState({
        group: '',
        state: false
    });
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [highlight, setHighlight] = useState({
        group: '',
        index: '',
    });

    const addMode = (index) => {
        if (isAdding.group === index) {
            setIsAdding({ group: index, state: !isAdding.state });
        } else {
            setIsAdding({ group: index, state: true });
        };
    };

    const add = (index) => {
        if (/^\s*$/.test(name)) {
            setHighlight({
                group: index,
                index: 0,
            });
            return;
        };
        if (/^\s*$/.test(price) || price === ".") {
            setHighlight({
                group: index,
                index: 1,
            });
            return;
        };
        props.setList([
            ...Storage.getUserData('data')?.extended?.shoplist?.mylists?.map((el, x) =>
                x === index ?
                    {
                        title: props?.list[index]?.title,
                        shoplist:
                            Storage.getUserData('data')?.extended?.shoplist?.mylists[x].shoplist ?
                                [
                                    ...Storage.getUserData('data')?.extended?.shoplist?.mylists[x].shoplist,
                                    {
                                        name: Formatting.fBig(name),
                                        price: price,
                                        count: !/^\s*$/.test(count) ? count : 1
                                    }
                                ] : [
                                    {
                                        name: Formatting.fBig(name),
                                        price: price,
                                        count: !/^\s*$/.test(count) ? count : 1
                                    }
                                ]
                    } : el
            )
        ]);
        setName('');
        setPrice('');
        setCount('');
        setCurrentItem({
            group: isAdding.group,
            index: 0
        });
    };

    const del = () => {
        props.setList(props.list.filter((t) => t.title !== props.list[current].title));
        setName('')
        setPrice('');
        setCount('');
    };

    useEffect(() => {
        if (acceptIndex !== '') {
            setModalAccept(true);
        };
    }, [acceptIndex]);

    useEffect(() => {
        if (currentEdit !== '') {
            setModalEdit(true);
        };
    }, [currentEdit]);

    useEffect(() => {
        if (props.added) {
            setIsAdding({
                group: props.list.length - 1,
                state: true
            });
        };
    }, [props.added]);

    useEffect(() => {
        setCurrentItem({
            ...isAdding,
            index: 0
        });
    }, [isAdding]);

    return (
        <div className='mw500 mt-3'>
            {
                props?.list?.map((tab, index) =>
                    !props?.hidden?.includes(tab.title) &&
                    <div
                        key={index}
                        className={`${classes.list} ${classes[props.theme]}`}
                    >
                        <h3 className='jcsb mt-3'>
                            {tab.title}
                            <div className='jcsb'>
                                <IconButton
                                    theme={props.theme}
                                    style={{ color: "#BA0000", filter: 'invert(0%)' }}
                                    onClick={() => {
                                        setCurrent(index);
                                        setModal(true);
                                    }}
                                >
                                    delete
                                </IconButton>
                                <IconButton
                                    theme={props.theme}
                                    onClick={() =>
                                        props.setHidden([...props.hidden, tab.title])
                                    }
                                >
                                    visibility_off
                                </IconButton>
                                {
                                    props.list.length === 0 && !isAdding.state && isAdding.group === index ?
                                        <Button onClick={() => addMode(index)}>Добавить первую покупку</Button>
                                        :
                                        <IconButton
                                            theme={props.theme}
                                            style={!isAdding.state && isAdding.group === index ||
                                                isAdding.group !== index ? { color: '#37911f', filter: 'invert(0%)' } : { color: '#ba0000', filter: 'invert(0%)' }}
                                            onClick={() => {
                                                addMode(index);
                                            }}
                                            title={!isAdding.state && isAdding.group === index ||
                                                isAdding.group !== index ? "Новая покупка" : "Не добавлять новую покупку"}
                                        >
                                            {
                                                !isAdding.state && isAdding.group === index ||
                                                    isAdding.group !== index ?
                                                    "add_shopping_cart" :
                                                    "remove_shopping_cart"
                                            }
                                        </IconButton>
                                }
                            </div>
                        </h3>
                        {
                            isAdding.state && isAdding.group === index &&
                            <div className={`${classes.addForm} ${classes[props.theme]}`}>
                                <h3 className="mt-3 mb-3 jcsb">
                                    Новая покупка
                                    <IconButton
                                        theme={props.theme}
                                        style={{ color: "#37911F", filter: "invert(0%)" }}
                                        onClick={() => add(index)}
                                    >
                                        done
                                    </IconButton>
                                </h3>
                                <InputPlaceholder
                                    highlight={highlight.group === index && highlight.index === 0}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus={currentItem?.group === index && currentItem?.index === 0 || highlight.group === index && highlight.index === 0}
                                    theme={props.theme}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setCurrentItem({
                                                group: index,
                                                index: 1
                                            });
                                        };
                                        if (e.key === "Backspace") {
                                            if (e.target.value === "") {
                                                addMode(index);
                                            };
                                        };
                                    }}
                                    placeholder="Название"
                                    bg={props.theme === "dark" ? "#202020" : "#fff"}
                                />
                                <InputPlaceholder
                                    highlight={highlight.group === index && highlight.index === 1}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    autoFocus={currentItem?.group === index && currentItem?.index === 1 || highlight.group === index && highlight.index === 1}
                                    theme={props.theme}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setCurrentItem({
                                                group: index,
                                                index: 2
                                            });
                                        };
                                        if (e.key === "Backspace") {
                                            if (e.target.value === "") {
                                                setCurrentItem({
                                                    group: index,
                                                    index: 0
                                                });
                                            };
                                        };
                                    }}
                                    placeholder="Цена"
                                    bg={props.theme === "dark" ? "#202020" : "#fff"}
                                    type="number"
                                />
                                <InputPlaceholder
                                    highlight={highlight.group === index && highlight.index === 2}
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                    autoFocus={currentItem?.group === index && currentItem?.index === 2 || highlight.group === index && highlight.index === 2}
                                    theme={props.theme}

                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setCurrentItem('');
                                            add(index);
                                        };
                                        if (e.key === "Backspace") {
                                            if (e.target.value === "") {
                                                setCurrentItem({
                                                    group: index,
                                                    index: 1
                                                });
                                            };
                                        };
                                    }}
                                    placeholder="Количество"
                                    bg={props.theme === "dark" ? "#202020" : "#fff"}
                                    type="number"
                                />
                            </div>
                        }
                        <List
                            theme={props.theme}
                            className="mt-4"
                            clickable
                        >
                            {tab?.shoplist?.map((item, x) =>
                                <li
                                    key={x}
                                    className="jcsb"
                                    onClick={() => setCurrentEdit({ group: index, index: x })}
                                >
                                    <span>{Formatting.fBig(item?.name)}</span>
                                    <div className='jcsb' style={{ wordBreak: "break-all", maxWidth: "50%", minWidth: '100px' }}>
                                        <span className={`${classes.itemSubInfo} ${classes[props.theme]}`}>
                                            <span>{item?.price}x</span>
                                            <span>{item?.count}</span>
                                        </span>
                                        <span className='jcsb'>
                                            {item?.count * item?.price} ₽
                                            <IconButton
                                                style={{ color: "#BA0000", filter: "invert(0%)" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    props.setList(
                                                        props.list.map((item) => item &&
                                                        {
                                                            ...item,
                                                            shoplist: item.shoplist?.filter((el, i) => i !== x)
                                                        }
                                                        ))
                                                }}
                                            >
                                                delete
                                            </IconButton>
                                        </span>
                                    </div>
                                </li>
                            )}
                        </List>
                        <h3 className='mw500 jcsb mb-3'>
                            {
                                tab?.shoplist?.length > 0 &&
                                <>
                                    <div>
                                        {tab?.shoplist?.length} {Formatting.declOfNum(tab?.shoplist?.length, ['товар', 'товара', 'товаров'])} на&nbsp;
                                        {
                                            tab?.shoplist?.map((x) => x.price * x.count)?.reduce((prev, next) => prev + next)
                                        } ₽
                                    </div>
                                    <Button
                                        red
                                        onClick={() => setAcceptIndex(index)}
                                    >
                                        Удалить все покупки
                                    </Button>
                                </>
                            }
                        </h3>
                    </div>
                )
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Подтверждение"
                footer="Подтвердить"
                footerRed
                onAccept={() => {
                    del();
                    setModal(false);
                }}
            >
                <div className="mw500">
                    <h3 style={{ fontWeight: "400" }}>Вы уверены, что хотите удалить список <span style={{ fontWeight: "500" }}>{props.list[current]?.title}</span>?</h3>
                </div>
            </Modal>
            <Modal
                theme={props.theme}
                visible={modalEdit}
                setVisible={setModalEdit}
                title={props.list[currentEdit.group]?.shoplist[currentEdit.index]?.name}
            >
                <div className="mw500">
                    <h5>
                        <InputPlaceholder
                            value={props.list[currentEdit.group]?.shoplist[currentEdit.index]?.price}
                            onChange={(e) => props.setList(
                                props.list.map((l, i) => i === currentEdit.group ?
                                    {
                                        ...l,
                                        shoplist: l.shoplist.map((w, p) =>
                                            p === currentEdit.index ?
                                                {
                                                    ...w,
                                                    price: e.target.value
                                                }
                                                : w
                                        )
                                    }
                                    : l
                                )
                            )
                            }
                            theme={props.theme}
                            placeholder="Цена"
                            bg={props.theme === "dark" ? "#202020" : "#fff"}
                            type="number"
                        />
                        <InputPlaceholder
                            value={props.list[currentEdit.group]?.shoplist[currentEdit.index]?.count}
                            onChange={(e) => props.setList(
                                props.list.map((l, i) => i === currentEdit.group ?
                                    {
                                        ...l,
                                        shoplist: l.shoplist.map((w, p) =>
                                            p === currentEdit.index ?
                                                {
                                                    ...w,
                                                    count: e.target.value
                                                }
                                                : w
                                        )
                                    }
                                    : l
                                )
                            )
                            }
                            theme={props.theme}
                            placeholder="Количество"
                            bg={props.theme === "dark" ? "#202020" : "#fff"}
                            type="number"
                        />
                    </h5>
                    <h5 className="jcsb">
                        <span>Стоимость</span>
                        <span>
                            {
                                props.list[currentEdit.group]?.shoplist[currentEdit.index]?.price *
                                props.list[currentEdit.group]?.shoplist[currentEdit.index]?.count
                            } ₽
                        </span>
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
                    if (acceptIndex !== '') {
                        props.setList(props.list.map((el, i) => i === acceptIndex ? { ...el, shoplist: [] } : el));
                        setAcceptIndex('');
                        setModalAccept(false);
                    };
                }}
            >
                <div className="mw500">
                    <h3 style={{fontWeight: '400'}}>
                        Вы уверены, что хотите удалить список товаров в списке&nbsp;
                        <span style={{fontWeight: '500'}}>
                            {props?.list[acceptIndex]?.title}
                        </span>
                        ?
                    </h3>
                </div>
            </Modal>
        </div>
    );
};

export default MyShoplistsData;