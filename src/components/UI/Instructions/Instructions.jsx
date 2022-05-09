import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import List from '../List/List';

const Instructions = (props) => {
    const [modal, setModal]   = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    return (
        <div>
            <h2 className="text-center text-uppercase green mt-5 mb-3">Попробуйте!</h2>
            <h3 className="text-center text-uppercase blue mt-2 mb-4">Модальные окна</h3>
            <List theme={props.theme} style={{maxWidth: '500px', margin: 'auto'}} clickable animate>
                <li
                    onClick={() => setModal(true)}
                >
                    Нажмите Escape при открытом не фиксированном модальном окне для его закрытия.
                </li>
                <li
                    onClick={() => setModal1(true)}
                >
                    У модальных окон также бывает "подвал".
                </li>
                <li
                    onClick={() => setModal2(true)}
                >
                    Есть и фиксированные модальные окна.
                </li>
            </List>
            <h3 className="text-center text-uppercase blue mt-2 mb-4">Мои рецепты</h3>
            <List theme={props.theme} style={{maxWidth: '500px', margin: 'auto'}}>
                <li>
                    Нажмите Enter, когда Вы сфокусированы на поле ввода для добавления следующего элемента списка. Например, следующего ингридиента.
                </li>
                <li>
                    Нажмите Enter в маленьком поле ввода или Ctrl + Enter - в большом для завершения действия. Например, для завершения изменения описания.
                </li>
            </List>
            <h3 className="text-center text-uppercase blue mt-2 mb-4">Список покупок</h3>
            <List theme={props.theme} style={{maxWidth: '500px', margin: 'auto'}}>
                <li>
                    Нажмите Enter в поле ввода для перехода к следующему полю ввода.
                </li>
                <li>
                    Нажмите Backspace (Кнопку удаления символа) в пустом поле для перехода к предыдущему полю ввода.
                </li>
                <li>
                    Вы можете не указывать количество товара, если Вам нужна только одна штука.
                    Просто пропустите это поле.
                    Система поймёт Ваши намерения и возьмёт единицу за количество.
                    Примечание: эта система работает только при добавлении покупки,
                    но не при изменении - в целях удобства использования.
                </li>
            </List>
            <h3 className='text-center text-uppercase blue mt-2 mb-4'>Индекс Массы Тела</h3>
            <List theme={props.theme} style={{maxWidth: '500px', margin: 'auto'}}>
                <li>
                    Если Ваш рост не изменился и Вы уже вводили его в предыдущий раз, можете оставить поле пустым.
                    Система возьмёт то же значение, что и в прошлый раз.
                </li>
            </List>
            <Modal
                visible={modal}
                setVisible={setModal}
                theme={props.theme}
                title="Молодец!"
            >
                <div style={{maxWidth: '500px'}}>
                    <h3 className='mb-2'>
                        Теперь ты знаешь, что такое модальные окна.
                    </h3>
                    <span style={{fontSize: "1.1rem"}}>
                        Попробуй нажать клавишу Escape, крестик справа вверху или на тёмную область за пределами модального окна для его закрытия.
                    </span>
                </div>
            </Modal>
            <Modal
                visible={modal1}
                setVisible={setModal1}
                theme={props.theme}
                title={"Окно с \"подвалом\""}
                footer="Попробуйте!"
                onAccept={() => {
                    setModal1(false);
                    setModal2(true);
                }}
            >
                <div style={{maxWidth: '500px'}}>
                    <h3 className='mb-2'>
                        Кнопка внизу.
                    </h3>
                    <span style={{fontSize: "1.1rem"}}>
                        При нажатии на неё произойдёт какое-либо действие.
                    </span>
                </div>
            </Modal>
            <Modal
                visible={modal2}
                setVisible={setModal2}
                theme={props.theme}
                title={"Фиксированное окно"}
                fixed
                footer={"Эту кнопку"}
                onAccept={() => {
                    setModal2(false);
                }}
            >
                <div style={{maxWidth: '500px'}}>
                    <h3 className='mb-2'>
                        Его просто так не закрыть.
                    </h3>
                    <span style={{fontSize: "1.1rem"}}>
                        Чтобы закрыть его, обычно требуется выполнить какое-либо действие. В данный момент Вам нужно просто нажать..
                    </span>
                </div>
            </Modal>
        </div>
    );
};

export default Instructions;