import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorPage from '../UI/pages/ErrorPage/ErrorPage';
import Happy_Birthday from '../UI/pages/Happy_Birthday';
import Projects from '../UI/pages/Projects/Projects';
import WeatherPage from '../UI/pages/WeatherPage/WeatherPage';
import WeatherExactPage from '../UI/pages/WeatherExactPage/WeatherExactPage';
import CookingPage from '../UI/pages/CookingPage/CookingPage';
import Settings from '../UI/Settings/Settings';
import RecipePage from '../UI/pages/RecipePage/RecipePage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Shoplist from '../UI/pages/Shoplist/Shoplist';
import MyNavigate from './MyNavigate';
import IMT from '../UI/pages/IMT/IMT';
import Todo from '../UI/pages/Todo/Todo';
import TimePage from '../UI/pages/TimePage/TimePage';

const owners = ["/", "/projects", "/settings"];

const Router = (props) => {
    const location = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const changeWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    const routes = [
        {
            path: "/",
            element: <Happy_Birthday theme={props.theme}/>
        },
        {
            path: "/settings",
            element:
                <Settings
                    theme={props.theme}
                    setTheme={props.setTheme}
                    visible={props.settingsVisible}
                    setVisible={props.setSettingsVisible}
                    isGeo={props.isGeo}
                    setIsGeo={props.setIsGeo}
                    isWeatherGraph={props.isWeatherGraph}
                    setIsWeatherGraph={props.setIsWeatherGraph}
                    isForbiddenWeatherGraph={props.isForbiddenWeatherGraph}
                    setIsForbiddenWeatherGraph={props.setIsForbiddenWeatherGraph}
                    isRecipesForbidden={props.isRecipesForbidden}
                    setIsRecipesForbidden={props.setIsRecipesForbidden}
                    isRecipes={props.isRecipes}
                    setIsRecipes={props.setIsRecipes}
                    recipesLimit={props.recipesLimit}
                    setRecipesLimit={props.setRecipesLimit}
                    recipesEditorDefault={props.recipesEditorDefault}
                    setRecipesEditorDefault={props.setRecipesEditorDefault}
                    isReadyRecipesImages={props.isReadyRecipesImages}
                    setIsReadyRecipesImages={props.setIsReadyRecipesImages}
                    deleteRecipesConfirm={props.deleteRecipesConfirm}
                    setDeleteRecipesConfirm={props.setDeleteRecipesConfirm}
                    newPurchase={props.newPurchase}
                    setNewPurchase={props.setNewPurchase}
                    imt={props.imt}
                    setimt={props.setimt}
                    todoNewDefault={props.todoNewDefault}
                    setTodoNewDefault={props.setTodoNewDefault}
                    isSound={props.isSound}
                    setIsSound={props.setIsSound}
                    isVibration={props.isVibration}
                    setIsVibration={props.setIsVibration}
                />
        },
        {
            path: "/projects",
            element: <Projects theme={props.theme} />
        },
        {
            path: "/projects/weather",
            element:
                <WeatherPage
                    theme={props.theme}
                    setTheme={props.setTheme}
                    settingsVisible={props.settingsVisible}
                    setSettingsVisible={props.setSettingsVisible}
                    isGeo={props.isGeo}
                    setIsGeo={props.setIsGeo}
                    isWeatherGraph={props.isWeatherGraph}
                    setIsWeatherGraph={props.setIsWeatherGraph}
                    isForbiddenWeatherGraph={props.isForbiddenWeatherGraph}
                    setIsForbiddenWeatherGraph={props.setIsForbiddenWeatherGraph}
                    coords={props.coords}
                />
        },
        {
            path: "/projects/weather/:index",
            element:
                <WeatherExactPage
                    theme={props.theme}
                    setTheme={props.setTheme}
                    settingsVisible={props.settingsVisible}
                    setSettingsVisible={props.setSettingsVisible}
                    isGeo={props.isGeo}
                    setIsGeo={props.setIsGeo}
                    isWeatherGraph={props.isWeatherGraph}
                    setIsWeatherGraph={props.setIsWeatherGraph}
                    isForbiddenWeatherGraph={props.isForbiddenWeatherGraph}
                    setIsForbiddenWeatherGraph={props.setIsForbiddenWeatherGraph}
                    coords={props.coords}
                />
        },
        {
            path: "/projects/cooking/pages/:list",
            element:
                <CookingPage
                    theme={props.theme}
                    isRecipesForbidden={props.isRecipesForbidden}
                    isRecipes={props.isRecipes}
                    recipesLimit={props.recipesLimit}
                    setRecipesLimit={props.setRecipesLimit}
                    recipesEditorDefault={props.recipesEditorDefault}
                    setRecipesEditorDefault={props.setRecipesEditorDefault}
                    isReadyRecipesImages={props.isReadyRecipesImages}
                    setIsReadyRecipesImages={props.isReadyRecipesImages}
                    needToResetMyDishes={props.needToResetMyDishes}
                    setNeedToResetMyDishes={props.setNeedToResetMyDishes}
                    deleteRecipesConfirm={props.deleteRecipesConfirm}
                    setDeleteRecipesConfirm={props.setDeleteRecipesConfirm}
                />
        },
        {
            path: "/projects/cooking/dish/:id",
            element: <RecipePage theme={props.theme} />
        },
        {
            path: "/projects/shoplist",
            element:
                <Shoplist
                    theme={props.theme}
                    newPurchase={props.newPurchase}
                />
        },
        {
            path: "/projects/weight",
            element:
                <IMT
                    theme={props.theme}
                    imt={props.imt}
                    setimt={props.setimt}
                />
        },
        {
            path: "/projects/todo",
            element:
                <Todo
                    theme={props.theme}
                    todoNewDefault={props.todoNewDefault}
                    setTodoNewDefault={props.setTodoNewDefault}
                />
        },
        {
            path: "/projects/time",
            element:
                <TimePage
                    theme={props.theme}
                    isSound={props.isSound}
                    setIsSound={props.setIsSound}
                />
        },
        {
            path: "/errors/404",
            element:
                <ErrorPage
                    theme={props.theme}
                    setTheme={props.setTheme}
                    settingsVisible={props.settingsVisible}
                    setSettingsVisible={props.setSettingsVisible}
                    isGeo={props.isGeo}
                    setIsGeo={props.setIsGeo}
                />
        },
        {
            path: "*",
            element: <MyNavigate to="/errors/404" />
        }
    ];
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.key}
                timeout={300}
                classNames={
                    width > 767 ?
                        owners.includes(location.pathname)
                            ?
                            "page-desc-out" : "page-desc-in"
                        :
                        owners.includes(location.pathname)
                            ?
                            "page-mobile-out" : "page-mobile-in"
                }
                unmountOnExit={true}
                mountOnEnter={false}
            >
                <Routes location={location}>
                    {routes.map((route) =>
                        <Route key={route.path} path={route.path} element={route.element} />
                    )}
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};
export default Router;