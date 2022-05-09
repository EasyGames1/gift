import React, { useEffect, useState } from 'react';
import List from '../../../List/List';
import IconButton from '../../../IconButton/IconButton';
import Modal from '../../../Modal/Modal';

const MyShoplists = (props) => {
    const [modal, setModal] = useState(false);
    const [current, setCurrent] = useState('');

    const del = () => {
        props.setList(props.list.filter((t) => t.title !== props.list[current].title));
        setModal(false);
    };

    useEffect(() => {
        if (!modal) {
            setCurrent('');
        };
    }, [modal]);

    useEffect(() => {
        if (current !== '') {
            setModal(true);
        };
    }, [current]);

    return (
        <>
            {
                props.list.length > 0 &&
                <div className='mt-4 mw500'>
                    <List
                        theme={props.theme}
                    >
                        {
                            props.list.map((sl, index) =>
                                <li
                                    key={index}
                                    className='jcsb'
                                >
                                    {sl.title}
                                    <div className="jcsb">
                                        <IconButton
                                            theme={props.theme}
                                            onClick={() =>
                                                props?.hidden?.includes(sl.title) ?
                                                    props.setHidden(props.hidden.filter((t) => t !== sl.title)) :
                                                    props.setHidden([...props.hidden, sl.title])
                                            }
                                            title={props.hidden.includes(sl.title) ? "Показать" : "Скрыть"}
                                        >
                                            {
                                                props.hidden.includes(sl.title) ?
                                                    "visibility" : "visibility_off"
                                            }
                                        </IconButton>
                                        <IconButton
                                            theme={props.theme}
                                            style={{ color: "#BA0000", filter: "invert(0%)" }}
                                            onClick={() => setCurrent(index)}
                                            title="Удалить"
                                        >
                                            delete
                                        </IconButton>
                                    </div>
                                </li>
                            )
                        }
                    </List>
                    <Modal
                        theme={props.theme}
                        visible={modal}
                        setVisible={setModal}
                        title="Подтверждение"
                        footer="Подтвердить"
                        footerRed
                        onAccept={del}
                    >
                        <div className="mw500">
                            <h3 style={{ fontWeight: "400" }}>
                                Вы уверены, что хотите удалить список&nbsp;
                                <span style={{ fontWeight: "500" }}>
                                    {props.list[current]?.title}
                                </span>
                                ?
                            </h3>
                        </div>
                    </Modal>
                </div>
            }
        </>
    );
};

export default MyShoplists;