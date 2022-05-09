import React from 'react';
import Modal from '../Modal/Modal';
import Toggler from '../Toggler/Toggler';

const Modals = (props) => {
    return (
        <>
            <Modal
                theme={props.theme}
                setTheme={props.setTheme}
                visible={props.AgentModalGeo}
                setVisible={props.setAgentModalGeo}
                title={"Геолокация"}
                fixed
            >
                <div style={{ maxWidth: '250px', margin: 'auto'}}>
                    <h4>
                        Несоответствие разрешений
                    </h4>
                    <div className='mt-3 mb-3' style={{ width: "250px" }}>
                        <h5 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            Приложение
                            <Toggler
                                checked={props.isGeo}
                                setChecked={props.setIsGeo}
                            />
                        </h5>
                    </div>
                    Разрешите в настройках браузера приложению доступ к геолокации или отзовите доступ внутри приложения.
                    Если что - то пойдёт не так - перезагрузите страницу.
                </div>
            </Modal>
        </>
    );
};

export default Modals;