import React from 'react';
import Instructions from '../../Instructions/Instructions';
import ProjectList from '../../ProjectList/ProjectList';

const projectsUseful = [
    {
        title: "Погода",
        icon: "air",
        link: "weather"
    },
    {
        title: "Список дел",
        icon: "checklist",
        link: "todo",
    },
    {
        title: "Список покупок",
        icon: "shopping_cart",
        link: "shoplist"
    },
    {
        title: "Работа со временем",
        icon: "schedule",
        link: "time"
    },
    {
        title: "Кулинария",
        icon: "restaurant_menu",
        link: "cooking/pages/1"
    },
    {
        title: "Индекс массы тела",
        icon: "monitor_weight",
        link: "weight",
    }
];

const Projects = (props) => {

    return (
        <div className='container'>
            <h1 className='text-center text-uppercase blue'>Проекты</h1>
            <h2 className='text-center text-uppercase green mt-5 mb-4'>Полезное</h2>
            <ProjectList theme={props.theme} projectsUseful={projectsUseful} />
            <Instructions theme={props.theme} />
        </div>
    );
};

export default Projects;