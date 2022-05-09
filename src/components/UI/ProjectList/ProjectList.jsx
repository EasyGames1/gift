import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProjectList.module.css';
import Input from '../Input/Input';

const Projects = (props) => {
    const show = (list) => {
        const row = list?.length > 3 ? 4 : 12 / list?.length;
        return list?.map((project, index) =>
            <div
                key={index}
                className={`col-xl-${row} col-md-${row} col-sm-12 ${classes.project}`}
                style={{ marginBottom: '30px' }}
                data-aos="fade-in"
            >
                <Link to={project.link} onClick={() => window.scrollTo(0, 0)} className={classes.circle}>
                    <span className={`material-icons${project.outlined ? "-outlined" : ""}`}>{project.icon}</span>
                </Link>
                <Link to={project.link} onClick={() => window.scrollTo(0, 0)} className={`${classes.title} ${classes[props.theme]}`}>
                    {project.title}
                    <div className={classes.line} />
                </Link>
            </div>
        );
    };
    const [query, setQuery] = useState('');
    const [searchedprops, setSearchedprops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!/^\s*$/.test(query)) {
            setSearchedprops(props?.projectsUseful.filter((project) => project?.title?.toLowerCase().includes(query.toLowerCase())));
        } else {
            setSearchedprops(props?.projectsUseful);
        };
    }, [query]);

    useEffect(() => {
        setSearchedprops(props?.projectsUseful);
        setIsLoading(false);
    }, []);

    return (
        <>
            <div className="text-center">
                <Input
                    placeholder="Поиск.."
                    theme={props.theme}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-5"
                />
            </div>
            <div className='row'>
                {!isLoading ?
                    searchedprops?.length === 0 ?
                        <div className='text-center' style={{ fontSize: '18px' }}>
                            По Вашему запросу ничего не найдено.
                        </div> :
                        show(searchedprops) : show(props.projectsUseful)
                }
            </div>
        </>
    );
};

export default Projects;