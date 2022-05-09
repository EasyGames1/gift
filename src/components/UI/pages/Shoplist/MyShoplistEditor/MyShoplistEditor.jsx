import React, { useEffect, useState } from 'react';
import Formatting from '../../../../../API/Formatting';
import Storage from '../../../../../API/Storage';
import Button from '../../../Button/Button';
import IconButton from '../../../IconButton/IconButton';
import InputPlaceholder from '../../../InputPlaceholder/InputPlaceholder';
import Modal from '../../../Modal/Modal';
import MyShoplists from '../MyShoplists/MyShoplists';
import classes from './MyShoplistEditor.module.css';

const MyShoplistEditor = (props) => {
    const [modal, setModal] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [current, setCurrent] = useState('');
    const [name, setName] = useState('');

    const add = () => {
        if (!/^\s*$/.test(name)) {
            if (props.list.map((tab) => tab.title === Formatting.fBig(name)).includes(true)) {
                setModal(true);
                return;
            };
            props.setList(
                Storage.getUserData('data')?.extended?.shoplist?.mylists ?
                    [...Storage.getUserData('data')?.extended?.shoplist?.mylists, { title: Formatting.fBig(name) }]
                    : [{ title: Formatting.fBig(name) }]
            );
            setName('');
            props.setAdded(true);
        } else {
            return;
        };
    };

    useEffect(() => {
        setCurrent(0);
    }, [isAdding]);

    return (
        <div className={`${classes.list} ${classes[props.theme]}`}>
            <h3 className='jcsb mt-3 mb-3'>
                Управление списками
                <IconButton
                    theme={props.theme}
                    style={isAdding ? { color: '#4361ee', filter: 'invert(0%)' } : { color: '#37911f', filter: 'invert(0%)' }}
                    onClick={() => {
                        if (isAdding) {
                            add();
                        };
                        setIsAdding(!isAdding);
                    }}
                    title={
                        isAdding ?
                            !/^\s*$/.test(name) ?
                                `Сохранить список ${name}` :
                                `Сохранить список не удастся - его название не может быть пустым` :
                            "Создать новый список"
                    }
                >
                    {
                        isAdding ? "playlist_add_check" : "playlist_add"
                    }
                </IconButton>
            </h3>
            {
                isAdding &&
                <>
                    <InputPlaceholder
                        theme={props.theme}
                        placeholder="Название списка"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus={current === 0}
                        blur={modal}
                        bg={props.theme === "dark" ? "#202020" : "#fff"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                add();
                            };
                            if (e.key === "Backspace" && /^\s*$/.test(e.target.value)) {
                                setIsAdding(false);
                            };
                        }}
                    />
                    {
                        !/^\s*$/.test(name) &&
                        <Button
                            onClick={add}
                        >
                            Создать
                        </Button>
                    }
                </>
            }
            <MyShoplists
                theme={props.theme}
                list={props.list}
                setList={props.setList}
                hidden={props.hidden}
                setHidden={props.setHidden}
            />
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Предупреждение"
            >
                <div className="mw500">
                    <h3>
                        Список уже существует.
                        Введите другое название.
                    </h3>
                </div>
            </Modal>
        </div>
    );
};

export default MyShoplistEditor;