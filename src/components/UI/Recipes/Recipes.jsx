import React, { useState } from 'react';
import classes from './Recipes.module.css';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import Image from '../Image';
import IconButton from '../IconButton/IconButton';

const Recipes = (props) => {
    const params = useParams();
    return (
        <div className="container">
            {
                props.error &&
                <h3 className='text-center mb-3'>
                    Ошибка&nbsp;
                    <a
                        href={`https://ru.wikipedia.org/wiki/Список_кодов_состояния_HTTP#${props.error}`}
                        target='_blank'
                    >
                        {props.error}
                    </a>
                    {
                        props.error === 429 &&
                        <div className='mt-3' style={{ maxWidth: '500px', margin: 'auto' }}>
                            <span>
                                Вероятно, ошибка случилась из-за превышения Вами месячного лимита запросов рецептов.
                            </span>
                        </div>
                    }
                </h3>
            }
            {
                props.isLoading ? <Loader /> :
                    <div className={`row ${classes.item}`}>
                        {!props.errorRecipes
                            ? props.isLoadingRecipes ? <Loader /> :
                                <>
                                    {props.recipes?.results?.map((recipe, index) => recipe.aspect_ratio === "16:9" &&
                                        <div data-aos="fade-in" data-aos-dureation="400" key={index} className={"col-xl-4 col-md-4 col-sm-12"} style={{ marginBottom: "50px" }}>
                                            <Link onClick={() => window.scrollTo(0, 0)} to={`/projects/cooking/dish/${recipe.id}`}>
                                                {
                                                    props.isReadyRecipesImages &&
                                                    <Image src={recipe.thumbnail_url} className={classes.image} />
                                                }
                                            </Link>
                                            <h4 className={`${classes.title} ${props.theme === "dark" && classes.dark} mt-3`}>
                                                <Link onClick={() => window.scrollTo(0, 0)} to={`/projects/cooking/dish/${recipe.id}`}>
                                                    {recipe.name}
                                                </Link>
                                                <a
                                                    href={`https://translate.google.com/?sl=auto&tl=ru&text=${recipe.name.replace(/&/g, "%26")}&op=translate`}
                                                    target="_blank"
                                                >
                                                    <IconButton theme={props.theme}>
                                                        g_translate
                                                    </IconButton>
                                                </a>
                                            </h4>
                                        </div>
                                    )}
                                    {props.recipes?.results?.map((recipe, index) => recipe.aspect_ratio !== "16:9" &&
                                        <div data-aos="fade-in" data-aos-dureation="400" key={index} className={"col-xl-4 col-md-4 col-sm-12"} style={{ marginBottom: "50px" }}>
                                            <Link onClick={() => window.scrollTo(0, 0)} to={`/projects/cooking/dish/${recipe.id}`}>
                                                {
                                                    props.isReadyRecipesImages &&
                                                    <Image src={recipe.thumbnail_url} className={classes.image} />
                                                }
                                            </Link>
                                            <h4 className={`${classes.title} ${props.theme === "dark" && classes.dark} mt-3`}>
                                                <Link onClick={() => window.scrollTo(0, 0)} to={`/projects/cooking/dish/${recipe.id}`}>
                                                    {recipe.name}
                                                </Link>
                                                <a
                                                    href={`https://translate.google.com/?sl=auto&tl=ru&text=${recipe.name.replace(/&/g, "%26")}&op=translate`}
                                                    target="_blank"
                                                >
                                                    <IconButton theme={props.theme}>
                                                        g_translate
                                                    </IconButton>
                                                </a>
                                            </h4>
                                        </div>
                                    )}
                                </>
                            :
                            'Произошла ошибка: не удалось загрузить рецепты.'
                        }
                    </div>
            }
            {
                !props.error
                    ? props.isLoadingRecipes
                        ? '' :
                        <Pagination
                            theme={props.theme}
                            totalCount={props.recipes.count}
                            size={props.recipesLimit}
                            current={params?.list}
                            path="/projects/cooking/pages/"
                        />
                    : ''
            }
        </div>
    );
};

export default Recipes;