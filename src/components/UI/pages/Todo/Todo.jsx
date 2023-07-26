import React, { useEffect, useState } from 'react';
import Select from '../../Select/Select';
import Modal from '../../Modal/Modal';
import InputPlaceholder from '../../InputPlaceholder/InputPlaceholder';
import Storage from '../../../../API/Storage';
import Formatting from '../../../../API/Formatting';
import IconButton from '../../IconButton/IconButton';
import List from '../../List/List';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';

const Todo = (props) => {
    const [modal, setModal] = useState(false);
    const [deleteCategorieModal, setDeleteCategorieModal] = useState(false);
    const [deleteListModal, setDeleteListModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [current, setCurrent] = useState('');
    const [highlight, setHighlight] = useState('');
    const [title, setTitle] = useState('');
    const [deleteCategory, setDeleteCategory] = useState({});
    const [newTask, setNewTask] = useState('');
    const [list, setList] = useState(
        Storage.getUserData('data')?.extended?.todo ?
            Storage.getUserData('data')?.extended?.todo :
            {}
    );
    const [isAdding, setIsAdding] = useState(props.todoNewDefault);
    const newCategoryFunc = () => {
        if (!/^\s*$/.test(newCategory)
            && !list?.categories?.includes(Formatting.fBig(newCategory))
            && Formatting.fBig(newCategory) !== "Работа"
            && Formatting.fBig(newCategory) !== "Дом"
            && Formatting.fBig(newCategory) !== "На ближайшее время"
            && Formatting.fBig(newCategory) !== "Новая категория") {
            setModal(false);
            setList({
                ...list,
                categories: list.categories ? [
                    ...list.categories,
                    Formatting.fBig(newCategory)
                ] : [Formatting.fBig(newCategory)]
            });
            setTitle(Formatting.fBig(newCategory));
            setNewCategory('');
        } else {
            setHighlight(0);
        };
    };

    const saveNewTask = () => {
        if (!/^\s*$/.test(newTask) && !list?.data?.map(el => el.name === title ? el.tasks.map(item => item.name === Formatting.fBig(newTask)).includes(true) : el).includes(true)) {
            if (list?.data?.map(el => el.name === title).includes(true)) {
                setList({
                    ...list,
                    data: list?.data?.map((el) => el.name === title ? {
                        name: title,
                        tasks: [
                            ...el.tasks,
                            {
                                name: Formatting.fBig(newTask),
                                state: false
                            }
                        ]
                    } : el)
                });
            } else {
                setList({
                    ...list,
                    data: list.data ? [...list.data, {
                        name: title,
                        tasks: [{
                            name: Formatting.fBig(newTask),
                            state: false
                        }]
                    }] : [{
                        name: title,
                        tasks: [{
                            name: Formatting.fBig(newTask),
                            state: false
                        }]
                    }]
                });
            };
            setNewTask('');
        } else {
            setHighlight(1);
        };
    };

    useEffect(() => {
        if (Object.keys(deleteCategory).length > 0) {
            if (deleteCategory?.type === "Категория") {
                setDeleteCategorieModal(true);
            } else {
                setDeleteListModal(true);
            };
        };
    }, [deleteCategory]);

    useEffect(() => {
        if (isAdding) {
            setCurrent(1);
        } else {
            setCurrent('');
        };
    }, [isAdding]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                todo: list
            }
        });
        if (!list.data || list.data?.length === 0) {
            setIsAdding(true);
        };
    }, [list]);

    useEffect(() => {
        if (highlight !== '') {
            setCurrent(highlight);
            setTimeout(() => {
                setHighlight('');
            }, 1500);
        };
    }, [highlight]);

    useEffect(() => {
        if (modal) {
            setTimeout(() => {
                setCurrent(0);
            }, 50);
        } else {
            setCurrent('');
        };
        setNewCategory('');
    }, [modal]);

    useEffect(() => {
        document.getElementById("title").textContent = "Список дел";

        return () => {
            document.getElementById("title").textContent = "Подарок";
        };
    }, []);

    return (
        <div>
            <h1 className="jcsb mw500 mb-3">
                Список дел
                <IconButton
                    theme={props.theme}
                    title={
                        isAdding ?
                            (!/^\s*$/.test(newTask) && !list?.data?.map(el => el.name === title ? el.tasks.map(item => item.name === Formatting.fBig(newTask)).includes(true) : el).includes(true)) ?
                                "Сохранить задачу" :
                                "Не добавлять задачу" :
                            "Добавить задачу"
                    }
                    style={isAdding ?
                        !/^\s*$/.test(newTask) && !list?.data?.map(el => el.name === title ? el.tasks.map(item => item.name === Formatting.fBig(newTask)).includes(true) : el).includes(true) ?
                            { color: "#4361ee", filter: "invert(0%)" } :
                            { color: "#BA0000", filter: "invert(0%)" } : { color: "#37911F", filter: "invert(0%)" }}
                    onClick={() => {
                        if ((!/^\s*$/.test(newTask) && !list?.data?.map(el => el.name === title ? el.tasks.map(item => item.name === Formatting.fBig(newTask)).includes(true) : el).includes(true)) &&
                            isAdding) {
                            saveNewTask();
                        } else {
                            if (isAdding) {
                                setNewTask('');
                            };
                            setIsAdding(!isAdding);
                        };
                    }}
                >
                    {
                        isAdding ?
                            (!/^\s*$/.test(newTask) && !list?.data?.map(el => el.name === title ? el.tasks.map(item => item.name === Formatting.fBig(newTask)).includes(true) : el).includes(true)) ?
                                "save" :
                                "cancel" :
                            "add"
                    }
                </IconButton>
            </h1>
            <div className="mw500">
                {
                    isAdding &&
                    <>
                        <InputPlaceholder
                            theme={props.theme}
                            placeholder="Новая задача"
                            bg={props.theme === "light" ? "#fff" : "#202020"}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveNewTask();
                                };
                            }}
                            autoFocus={current === 1}
                            highlight={highlight === 1}
                        />
                        <Select
                            theme={props.theme}
                            title={title}
                            setTitle={setTitle}
                            onChange={(title) => {
                                setTitle(title);
                                setCurrent(1);
                                if (current === 1) {
                                    setCurrent('');
                                    setCurrent(1);
                                } else {
                                    setCurrent(1);
                                };
                            }}
                            className="mt-3 mb-3"
                        >
                            <div>На ближайшее время</div>
                            <div>Работа</div>
                            <div>Дом</div>
                            <>
                                {
                                    list?.categories?.map((cat) =>
                                        <div key={cat} onClick={() => setTitle(cat)}>
                                            {
                                                cat
                                            }
                                        </div>
                                    )
                                }

                            </>
                            <div disabled onClick={() => setModal(true)}>
                                <span className='material-icons'>
                                    add
                                </span>
                                Новая категория
                            </div>
                        </Select>
                    </>
                }
                {
                    list.categories?.length > 0 &&
                    <>
                        <h3 className="mt-4 mb-4 jcsb">
                            Мои категории
                            <IconButton
                                theme={props.theme}
                                onClick={() => setModal(true)}
                                style={{ color: "#37911F", filter: "invert(0%)" }}
                            >
                                add
                            </IconButton>
                        </h3>
                        <List
                            theme={props.theme}
                        >
                            <TransitionGroup>
                                {
                                    list?.categories?.map((el, index) =>
                                        <CSSTransition
                                            key={el}
                                            timeout={300}
                                            classNames="fade"
                                        >
                                            <li className='jcsb'>
                                                {el}
                                                <IconButton
                                                    theme={props.theme}
                                                    style={{ color: "#BA0000", filter: "invert(0%)" }}
                                                    onClick={() => setDeleteCategory({ el: el, index: index, type: "Категория" })}
                                                >
                                                    delete
                                                </IconButton>
                                            </li>
                                        </CSSTransition>
                                    )
                                }
                            </TransitionGroup>
                        </List>
                    </>
                }
                {
                    list?.data && list.data.length > 0 &&
                    list?.data?.map((el, i) => el.tasks?.length > 0 &&
                        <div key={i}>
                            <h3 className='mb-4 jcsb'>
                                {el.name}
                                <IconButton
                                    theme={props.theme}
                                    style={{ color: "#37911F", filter: "invert(0%)" }}
                                    onClick={() => {
                                        setTitle(el.name);
                                        setIsAdding(true);
                                        if (current === 1) {
                                            setCurrent('');
                                            setTimeout(() => {
                                                setCurrent(1);
                                            }, 50);
                                        } else {
                                            setCurrent(1);
                                        };
                                    }}
                                >
                                    add
                                </IconButton>
                            </h3>
                            <List
                                theme={props.theme}
                            >
                                <TransitionGroup>
                                    {el?.tasks?.map((item, x) =>
                                        <CSSTransition
                                            key={item.name}
                                            classNames="fade"
                                            timeout={300}
                                        >
                                            <li className='jcsb'>
                                                <Checkbox
                                                    checked={list.data[i].tasks[x].state}
                                                    setChecked={() =>
                                                        setList({
                                                            ...list,
                                                            data: list.data.map((element, z) => z === i ? {
                                                                name: element.name,
                                                                tasks: element.tasks.map((d, y) => y === x ? {
                                                                    name: d.name,
                                                                    state: !d.state
                                                                } : d)
                                                            } : element)
                                                        })
                                                    }
                                                >
                                                    {item.name}
                                                </Checkbox>
                                                <IconButton
                                                    theme={props.theme}
                                                    style={{ color: "#BA0000", filter: "invert(0%)" }}
                                                    onClick={() =>
                                                        setList({
                                                            ...list,
                                                            data: list.data.map((element, z) =>
                                                                z === i ? {
                                                                    name: element.name,
                                                                    tasks: element.tasks.filter((d, y) => y !== x)
                                                                } : element)
                                                        })}
                                                >
                                                    delete
                                                </IconButton>
                                            </li>
                                        </CSSTransition>
                                    )}
                                </TransitionGroup>
                            </List>
                            <div className="text-center">
                                <Button
                                    red
                                    onClick={() => setDeleteCategory({ el: el.name, index: i, type: "Список" })}
                                >
                                    Очистить список
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Создание категории"
                footer="Создать"
                onAccept={newCategoryFunc}
            >
                <div className="mw500">
                    <h5 className='mb-3'>Какую категорию Вы хотите создать?</h5>
                    <InputPlaceholder
                        theme={props.theme}
                        bg={props.theme === "light" ? "#fff" : "#202020"}
                        placeholder="Название категории"
                        autoFocus={current === 0}
                        highlight={highlight === 0}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
            </Modal>
            <Modal
                theme={props.theme}
                visible={deleteCategorieModal}
                setVisible={setDeleteCategorieModal}
                title="Подтверждение"
                footer="Удалить категорию"
                footerRed
                onAccept={() => {
                    setList({
                        ...list,
                        data: list?.data?.filter((it, x) => list.data.map((item) => item.name).indexOf(deleteCategory?.el) !== x) || [],
                        categories: list.categories.filter((item, i) => i !== deleteCategory.index)
                    });
                    setTitle("На ближайшее время");
                    setDeleteCategorieModal(false);
                }}
            >
                <div className="mw500">
                    <h5 style={{ fontWeight: '400' }}>
                        Вы действительно хотите удалить категорию&nbsp;
                        <span style={{ fontWeight: '500' }}>
                            {deleteCategory?.el}?
                        </span>
                    </h5>
                </div>
            </Modal>
            <Modal
                theme={props.theme}
                visible={deleteListModal}
                setVisible={setDeleteListModal}
                title="Подтверждение"
                footer="Очистить список"
                footerRed
                onAccept={() => {
                    setList({
                        ...list,
                        data: list.data.map((element, z) =>
                            z === deleteCategory?.index ? {
                                name: deleteCategory?.el,
                                tasks: []
                            } : element)
                    });
                    setDeleteListModal(false);
                }}
            >
                <div className="mw500">
                    <h5 style={{ fontWeight: '400' }}>
                        Вы действительно хотите очистить список категории&nbsp;
                        <span style={{ fontWeight: '500' }}>
                            {deleteCategory?.el}?
                        </span>
                    </h5>
                </div>
            </Modal>
        </div >
    );
};

export default Todo;