import React, { useEffect, useState } from 'react';
import classes from './Settings.module.css';
import Theme_Choose from '../Theme_Choose/Theme_Choose';
import Toggler from '../Toggler/Toggler';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Storage from '../../../API/Storage';
import Modal from '../Modal/Modal';
import InputPlaceholder from '../InputPlaceholder/InputPlaceholder';

const Settings = (props) => {
    const [settings, setSettings] = useState([]);
    const [searchedSettings, setSearchedSettings] = useState([]);
    const [query, setQuery] = useState('');
    const [width, setWidth] = useState(window.innerWidth);
    const changeWidth = () => {
        setWidth(window.innerWidth);
    };
    const [modal, setModal] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [importAccept, setImportAccept] = useState(false);
    const [importAcceptModal, setImportAcceptModal] = useState(false);
    const [importString, setImportString] = useState('');
    const [exportModal, setExportModal] = useState(false);

    useEffect(() => {
        setSettings([
            {
                title: 'Разрешения',
                content: [
                    {
                        title: 'Геолокация',
                        desc: 'Геолокация нужна для отображения погоды в Вашем районе. Если отключить, погода станет недоступна.',
                        class: classes.permission,
                        isToggler: true,
                        toggler: props.isGeo,
                        setToggler: props.setIsGeo
                    },
                    {
                        title: 'Звуки',
                        desc: 'При отключении этой функции звуки будильника и звуки обратного отсчёта продолжат функционировать. Отключение также хорошо экономит трафик. Включение звука происходит после перезагрузки страницы.',
                        class: `${classes.permission} mt-3`,
                        isToggler: true,
                        toggler: props.isSound,
                        setToggler: props.setIsSound
                    },
                    {
                        title: 'Вибрации',
                        desc: 'При отключении этой функции вибрации будильника и вибрации обратного отсчёта продолжат функционировать. Вибрация доступна только в поддерживающих её браузерах и устройствах.',
                        class: `${classes.permission} mt-3`,
                        isToggler: true,
                        toggler: props.isVibration,
                        setToggler: props.setIsVibration
                    },

                ]
            },
            {
                title: 'Расширенные настройки',
                content: [
                    {
                        parent: 'Погода',
                        subparent: 'График',
                        title: 'Запрет',
                        desc: `Запрет на упоминание графика в погоде. 
                            ${width >= 500
                                ? "Ваше устройство подходит для просмотра."
                                : "Не рекомендую - у Вас слишком маленький экран."}`,
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.isForbiddenWeatherGraph,
                        setToggler: props.setIsForbiddenWeatherGraph
                    },
                    {
                        parent: 'Погода',
                        subparent: 'График',
                        title: 'Показывать по умолчанию',
                        desc: `Данная линейная диаграмма визуализирует прогноз погоды: температуру, облачность и влажность.
                            ${width >= 500
                                ? "Ваше устройство подходит для просмотра."
                                : "Не рекомендую - у Вас слишком маленький экран."}`,
                        class: classes.permission,
                        isToggler: true,
                        toggler: props.isWeatherGraph,
                        setToggler: props.setIsWeatherGraph,
                        disabled: props.isForbiddenWeatherGraph
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Готовые рецепты',
                        title: 'Запрет',
                        desc: 'Нужны ли Вам готовые рецепты в кулинарии?',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.isRecipesForbidden,
                        setToggler: props.setIsRecipesForbidden
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Готовые рецепты',
                        title: 'Показывать по умолчанию',
                        desc: 'Если неохото нажимать на кнопку. Предупреждение: картинки весят много, мобильный трафик жрёт ещё так!',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.isRecipes,
                        setToggler: props.setIsRecipes,
                        disabled: props.isRecipesForbidden
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Готовые рецепты',
                        title: 'Картинки',
                        desc: 'Показывать ли картинки в списке готовых рецептов? При отключении Вы можете сэкономить кучу трафика. Акутально только для мобильной сети с ограничением трафика.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.isReadyRecipesImages,
                        setToggler: props.setIsReadyRecipesImages,
                        disabled: props.isRecipesForbidden
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Готовые рецепты',
                        title: 'Количество на странице',
                        desc: 'Количество рецептов на одной странице.',
                        class: `${classes.permission} mb-3`,
                        isToggler: false,
                        value: props.recipesLimit,
                        onChange: (e) => { props.setRecipesLimit(e.target.value) },
                        disabled: props.isRecipesForbidden
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Мои блюда',
                        title: 'Подтверждать удаление',
                        desc: 'Если Вы или Ваш ребёнок случайно нажали кнопку удаления рецепта, Вам потребуется подтвердить это в дополнительном модальном окне.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.deleteRecipesConfirm,
                        setToggler: props.setDeleteRecipesConfirm
                    },
                    {
                        parent: 'Кулинария',
                        subparent: 'Редактор блюд',
                        title: 'Показывать по умолчанию',
                        desc: 'Редактор блюд будет открыт по умолчанию.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.recipesEditorDefault,
                        setToggler: props.setRecipesEditorDefault
                    },
                    {
                        parent: 'Список покупок',
                        subparent: 'Будущие покупки',
                        title: 'Показывать редактор новой покупки по умолчанию',
                        desc: 'Вам будет предложено создание новой покупки в списке покупок по умолчанию.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.newPurchase,
                        setToggler: props.setNewPurchase
                    },
                    {
                        parent: 'Индекс массы тела',
                        title: 'Показывать поле добавления информации по умолчанию',
                        desc: 'Вам будет предложено добавление информации по умолчанию.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.imt,
                        setToggler: props.setimt
                    },
                    {
                        parent: 'Список дел',
                        title: 'Показывать поле добавления задачи по умолчанию',
                        desc: 'Вам будет предложено добавление задачи по умолчанию.',
                        class: `${classes.permission} mb-3`,
                        isToggler: true,
                        toggler: props.todoNewDefault,
                        setToggler: props.setTodoNewDefault
                    }
                ]
            }
        ])
    }, [props, width]);

    useEffect(() => {
        setSearchedSettings(settings);
    }, [settings]);

    useEffect(() => {
        if (query !== '') {
            setSearchedSettings(settings?.map((setting) => setting && {
                title: setting?.content?.filter((content) =>
                    content?.title?.toLowerCase().includes(query.toLowerCase()) ||
                    content?.parent?.toLowerCase().includes(query.toLowerCase()) ||
                    content?.subparent?.toLowerCase().includes(query.toLowerCase())).length === 0 ? '' : setting.title,
                content: setting?.content?.filter((content) =>
                    content?.title?.toLowerCase().includes(query.toLowerCase()) ||
                    content?.parent?.toLowerCase().includes(query.toLowerCase()) ||
                    content?.subparent?.toLowerCase().includes(query.toLowerCase())
                )
            }
            ));
        } else {
            setSearchedSettings(settings);
        };
    }, [query]);

    useEffect(() => {
        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    return (
        <div className={classes.settings}>
            <h1 className='mb-4 text-center'>Настройки</h1>
            <h3 className='mb-3'>Выберите тему</h3>
            <div className={classes.themes}>
                <Theme_Choose
                    theme={props.theme}
                    setTheme={props.setTheme}
                    showTheme={"dark"}
                />
                <Theme_Choose
                    theme={props.theme}
                    setTheme={props.setTheme}
                    showTheme={"light"}
                />
            </div>
            <div>
                <div className="text-center mt-4">
                    <Input
                        placeholder="Поиск.."
                        theme={props.theme}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                {
                    searchedSettings?.map((setting, index) =>
                        <div key={index}>
                            <h3 className="mt-3 mb-3">{setting?.title}</h3>
                            {setting?.content?.map((content, i) =>
                                <div
                                    key={i}
                                >
                                    <>
                                        {
                                            (i === 0 ||
                                                content?.parent && i > 0 && content?.parent !== setting?.content[i - 1]?.parent)
                                            && <h4 className="mt-3 mb-3">{content?.parent}</h4>
                                        }
                                        {
                                            (i === 0 ||
                                                content?.subparent && i > 0 && content?.subparent !== setting?.content[i - 1]?.subparent)
                                            && <h5 className='mb-2'>{content?.subparent}</h5>
                                        }
                                    </>
                                    <span
                                        className={content.class}
                                        data-tooltip={content.desc}
                                    >
                                        <span>{content.title}</span>
                                        {
                                            content?.isToggler ?
                                                <Toggler
                                                    checked={content.toggler}
                                                    setChecked={content.setToggler}
                                                    disabled={content.disabled && content.disabled}
                                                />
                                                :
                                                <Input
                                                    theme={props.theme}
                                                    value={content?.value}
                                                    onChange={content?.onChange}
                                                    type={content?.type || "text"}
                                                    style={{ minWidth: "50px", maxWidth: "2em", padding: "5px 5px", textAlign: "center" }}
                                                    disabled={content?.disabled}
                                                />
                                        }
                                    </span>
                                </div>
                            )}
                        </div>)
                }
                <div className="text-center mb-3 row gx-3">
                    <Button className="col" onClick={() => setImportModal(true)}>
                        Импорт данных
                    </Button>
                    <Button className="col" onClick={() => {
                        if ("clipboard" in navigator) {
                            navigator.clipboard.writeText(localStorage.getItem('user'));
                        } else {
                            alert("Ваш браузер не поддерживает копирование текста в буфер обмена.");
                        };
                        setExportModal(true)
                    }}>
                        Экспорт данных
                    </Button>
                </div>
                <div className="text-center">
                    <Button
                        red
                        onClick={() => setModal(true)}
                    >
                        Сбросить настройки
                    </Button>
                </div>

                <Modal
                    theme={props.theme}
                    visible={importModal}
                    setVisible={setImportModal}
                    title="Импорт данных"
                    footer="Импортировать"
                    footerRed
                    onAccept={() => {
                        if (importAccept) {
                            localStorage.setItem('user', importString);
                            window.location.reload();
                        } else {
                            setImportModal(false);
                            setImportAcceptModal(true);
                            return;
                        };
                    }}
                >
                    <div className="mw500 text-center">
                        <h3 className="red">
                            Внимание!
                        </h3>
                        <span>
                            Будьте предельно внимательны при вставке данных! При вставке неверных данных Вы можете сломать приложение или потерять свои данные! Данные на сайте будут заменены на те, что Вы вставили. Действие необратимо.
                        </span>
                        <InputPlaceholder
                            theme={props.theme}
                            value={importString}
                            onChange={(e) => setImportString(e.target.value)}
                        />
                        <h5 className="jcsb mt-3" style={{ textAlign: "left" }}>
                            Я принимаю условия импорта данных
                            <Toggler
                                checked={importAccept}
                                setChecked={setImportAccept}
                            />
                        </h5>
                    </div>
                </Modal>

                <Modal
                    theme={props.theme}
                    visible={exportModal}
                    setVisible={setExportModal}
                    title="Уведомление"
                >
                    <div className="mw500">
                        <h3>
                            Ваши данные были успешно скопированы в буфер обмена.
                        </h3>
                    </div>
                </Modal>

                <Modal
                    theme={props.theme}
                    visible={importAcceptModal}
                    setVisible={setImportAcceptModal}
                    title="Предупреждение"
                    footer="Вернуться"
                    onAccept={() => {
                        setImportAcceptModal(false);
                        setImportModal(true);
                    }}
                >
                    <h3 className="text-center mw500">Вы не приняли условия импорта данных.</h3>
                </Modal>

                <Modal
                    theme={props.theme}
                    visible={modal}
                    setVisible={setModal}
                    title={!Storage.getUserData('settings') || Object.keys(Storage.getUserData('settings')).length === 0 ? "Уведомление" : "Подтверждение"}
                    footer={!Storage.getUserData('settings') || Object.keys(Storage.getUserData('settings')).length === 0 ? "" : "Сбросить настройки"}
                    footerRed
                    onAccept={() => {
                        if (Storage.getUserData('settings') && Object.keys(Storage.getUserData('settings')).length !== 0) {
                            Storage.setUserData("settings", {});
                            window.location.reload();
                        };
                    }}
                >
                    <div className="mw500">
                        {
                            Storage.getUserData('settings') && Object.keys(Storage.getUserData('settings')).length !== 0 ?
                                <h3>Вы уверены, что хотите сбросить настройки?</h3> :
                                <h3>Вы уже сбросили настройки.</h3>
                        }
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Settings;