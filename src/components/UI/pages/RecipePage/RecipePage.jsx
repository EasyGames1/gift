import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../../../API/PostService';
import { useFetching } from '../../../../hooks/useFetching';
import Button from '../../Button/Button';
import Image from '../../Image';
import Loader from '../../Loader/Loader';
import classes from './RecipePage.module.css';
import IconButton from '../../IconButton/IconButton';
import Modal from '../../Modal/Modal';
import Toggler from '../../Toggler/Toggler';
import Storage from '../../../../API/Storage';
import { HashLink as Link } from 'react-router-hash-link';

const RecipePage = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [recipe, setRecipe] = useState('');
    const [isSample, setIsSample] = useState(false);
    const [isName, setIsName] = useState(true);
    const [isSteps, setIsSteps] = useState(true);
    const [isDesc, setIsDesc] = useState(true);
    const [isNutrition, setIsNutrition] = useState(false);
    const [isLiked, setIsLiked] = useState(
        Storage.getUserData('data')?.extended?.cooking?.liked ?
            Storage.getUserData('data')?.extended?.cooking?.liked?.indexOf(params?.id) != -1 ?
                true : false : false
    );
    const [fetchingRecipe, isLoading, error] = useFetching(async () => {
        const response = await PostService.getRecipe(params?.id);
        setRecipe(response.data);
    });

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                cooking: {
                    ...Storage.getUserData('data')?.extended?.cooking,
                    liked:
                        Storage.getUserData('data')?.extended?.cooking?.liked ?
                            isLiked ?
                                Storage.getUserData('data')?.extended?.cooking?.liked?.indexOf(params.id) != -1 ?
                                    [...Storage.getUserData('data')?.extended?.cooking?.liked]
                                    : [...Storage.getUserData('data')?.extended?.cooking?.liked, params.id]
                                : [...Storage.getUserData('data')?.extended?.cooking?.liked.filter((liked) => liked != params.id)]
                            : isLiked ? [params.id] : []
                }
            }
        })
    }, [isLiked]);

    useEffect(() => {
        fetchingRecipe();
    }, []);

    return (
        <div>
            <h1 className='text-center mb-3'>??????????</h1>
            {
                isLoading ? <Loader /> :
                    <>
                        <h2 className='text-center mb-3'>{recipe?.name}</h2>
                        <div className='text-center mb-3' style={{ maxWidth: '500px', margin: 'auto' }}>
                            <a
                                className={classes.link}
                                href={`https://translate.google.com/?sl=auto&tl=ru&text=${recipe?.name}&op=translate`}
                                target="_blank"
                            >
                                <Button className='mb-4'>
                                    ??????????????????
                                </Button>
                            </a>
                            <Image title={recipe?.name} src={recipe?.thumbnail_url} className={classes.image} />
                            {
                                recipe?.user_ratings &&
                                <div className={classes.userRatings}>
                                    <div>
                                        <IconButton theme={props.theme} disabled={true}>
                                            thumb_up
                                        </IconButton>
                                        {recipe?.user_ratings?.count_positive}
                                    </div>
                                    <div>
                                        <IconButton style={{ color: "red", filter: "invert(0%)" }} onClick={() => setIsLiked(!isLiked)} theme={props.theme}>
                                            {isLiked ? "favorite" : "favorite_border"}
                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton theme={props.theme} disabled={true}>
                                            thumb_down
                                        </IconButton>
                                        {recipe?.user_ratings?.count_negative}
                                    </div>
                                </div>
                            }
                            {
                                isLiked &&
                                <Link to="/projects/cooking/pages/1#liked">
                                    <Button className="mt-3">?? ??????????????????????????</Button>
                                </Link>
                            }
                        </div>
                        <div className={classes.instructions}>
                            <h1 className='mb-3' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                ??????????????????????????
                                {recipe?.renditions[0]?.url &&
                                    <a target='_blank' href={recipe?.renditions[0]?.url}>
                                        <IconButton style={{ fontSize: '32px' }} theme={props.theme}>
                                            play_circle_filled
                                        </IconButton>
                                    </a>
                                }
                            </h1>
                            {
                                recipe?.instructions?.map((instruction, index) =>
                                    <div key={index}>
                                        <h3 className={`${classes.instruction} text-left mt-3 mb-2`}>
                                            ?????? {index + 1}
                                            <a
                                                className={classes.link}
                                                href={`https://translate.google.com/?sl=en&tl=ru&text=${instruction.display_text}&op=translate`}
                                                target="_blank"
                                            >
                                                <IconButton theme={props.theme}>
                                                    g_translate
                                                </IconButton>
                                            </a>
                                        </h3>
                                        {instruction.display_text}
                                    </div>
                                )
                            }
                            {
                                recipe?.yields ?
                                    <div className="mt-3">
                                        <h2 className={`${classes.instruction} mb-2`}>??????????
                                            <a
                                                style={{ marginLeft: "10px" }}
                                                className={classes.link}
                                                href={`https://translate.google.com/?sl=en&tl=ru&text=${recipe?.yields}&op=translate`}
                                                target="_blank"
                                            >
                                                <IconButton theme={props.theme}>
                                                    g_translate
                                                </IconButton>
                                            </a>
                                        </h2>
                                        <span>
                                            {recipe?.yields}
                                        </span><br />
                                    </div> :
                                    <div className="mt-3">
                                        <span>
                                            ?????? ???????????????????? ???? ?????????? ?????????????????????????? ?????????? ??????????.
                                        </span><br />
                                    </div>
                            }
                        </div>
                        {
                            recipe?.nutrition?.calories || recipe?.nutrition?.carbohydrates || recipe?.prep_time_minutes || recipe?.cook_time_minutes ||
                                recipe?.num_servings || recipe?.nutrition?.protein || recipe?.nutrition?.fat || recipe?.nutrition?.fiber || recipe?.nutrition?.sugar ?
                                <div className={`${classes.instructions} mt-4`}>
                                    <h1 className='mb-3'>????????????????????</h1>
                                    {
                                        recipe?.description ?
                                            <div className="mt-3">
                                                <h3 className='mb-2'>????????????????</h3>
                                                <span>
                                                    {recipe?.description}
                                                    <a
                                                        style={{ marginLeft: "10px" }}
                                                        className={classes.link}
                                                        href={`https://translate.google.com/?sl=en&tl=ru&text=${recipe?.description}&op=translate`}
                                                        target="_blank"
                                                    >
                                                        <IconButton theme={props.theme}>
                                                            g_translate
                                                        </IconButton>
                                                    </a>
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?? ?????????? ?????????? ?????? ????????????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.prep_time_minutes ?
                                            <div className="mt-3">
                                                <span>
                                                    ?????????? ????????????????????: {recipe?.prep_time_minutes} ??????
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ?????????????? ???????????????????? ?? ?????????????? ?????????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.cook_time_minutes ?
                                            <div className="mt-3">
                                                <span>
                                                    ?????????? ??????????????????????????: {recipe?.cook_time_minutes} ??????
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ?????????????? ?????????????????????????? ?????????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.num_servings ?
                                            <div className="mt-3">
                                                <span>
                                                    ???????????????????? ????????????: {recipe?.num_servings}
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ???????????????????? ???????????? ?????????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.protein ?
                                            <div className="mt-3">
                                                <span>
                                                    ????????????: {recipe?.nutrition?.protein} ??
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ???????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.calories ?
                                            <div className='mt-3'>
                                                <span>
                                                    ??????????????: {recipe?.nutrition?.calories} ????????
                                                </span><br />
                                            </div>
                                            :
                                            <div className='mt-3'>
                                                <span>
                                                    ?????? ???????????????????? ?? ???????????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.carbohydrates ?
                                            <div className='mt-3'>
                                                <span>
                                                    ??????????????????: {recipe?.nutrition?.carbohydrates} ??
                                                </span><br />
                                            </div> :
                                            <div className='mt-3'>
                                                <span>
                                                    ?????? ???????????????????? ???? ?????????????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.fat ?
                                            <div className="mt-3">
                                                <span>
                                                    ??????????: {recipe?.nutrition?.fat} ??
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ?????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.fiber ?
                                            <div className="mt-3">
                                                <span>
                                                    ??????????????????: {recipe?.nutrition?.fiber} ??
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ?????????????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                    {
                                        recipe?.nutrition?.sugar ?
                                            <div className="mt-3">
                                                <span>
                                                    ????????????: {recipe?.nutrition?.sugar} ??
                                                </span><br />
                                            </div> :
                                            <div className="mt-3">
                                                <span>
                                                    ?????? ???????????????????? ?? ???????????? ?? ???????? ??????????.
                                                </span><br />
                                            </div>
                                    }
                                </div> :
                                <h2 className="text-center mt-3 mb-4">?????? ???????????????????? ?? ??????????????.</h2>
                        }
                        <div className="row text-center mt-3 mb-3" style={{ maxWidth: '500px', margin: 'auto' }}>
                            <div className="col">
                                <Button
                                    style={{ width: '100%' }}
                                    onClick={() => setIsSample(true)}
                                >
                                    ???????????????????????? ?????? ????????????
                                </Button>
                            </div>
                            <Link className='col' to="/projects/cooking/pages/1" onClick={() => window.scrollTo(0, 0)}>
                                <Button style={{ width: '100%' }}>?? ?????????????? ????????????</Button>
                            </Link>
                        </div>
                    </>
            }
            <Modal
                theme={props.theme}
                visible={isSample}
                setVisible={setIsSample}
                title="???????????????????? ??????????????"
                big
                footer="??????????????????"
                onAccept={() => {
                    Storage.setUserData('data', {
                        ...Storage.getUserData('data'),
                        extended: {
                            ...Storage.getUserData('data')?.extended,
                            cooking: {
                                ...Storage.getUserData('data')?.extended?.cooking,
                                dishes:
                                    Storage.getUserData('data')?.extended?.cooking?.dishes != null ?
                                        [
                                            ...Storage.getUserData('data')?.extended?.cooking?.dishes,
                                            {
                                                name: isName ? !/^\s*$/.test(recipe?.name) ? recipe?.name : "?????????? ?????? ????????????????" : "?????????? ?????? ????????????????",
                                                ingridients: [],
                                                steps: isSteps ? recipe?.instructions?.map((step) => step?.display_text) : [],
                                                description: isDesc ?
                                                    `${recipe?.description != null && recipe?.description} ${recipe?.prep_time_minutes != null ? `\n????????????????????: ${recipe?.prep_time_minutes} ??????????` : ''} ${recipe?.cook_time_minutes != null ? `\n??????????????: ${recipe?.cook_time_minutes} ??????????` : ''} ${recipe?.num_servings != undefined ? `\n????????????: ${recipe?.num_servings}` : ''} ${isNutrition ? recipe?.nutrition?.protein != undefined ? `\n????????????: ${recipe?.nutrition?.protein} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.calories != undefined ? `\n??????????????: ${recipe?.nutrition?.calories} ????????` : '' : ''} ${isNutrition ? recipe?.nutrition?.carbohydrates != undefined ? `\n??????????????????: ${recipe?.nutrition?.carbohydrates} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.fat != undefined ? `\n??????????: ${recipe?.nutrition?.fat} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.fiber != undefined ? `\n??????????????????: ${recipe?.nutrition?.fiber} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.sugar != undefined ? `\n????????????: ${recipe?.nutrition?.sugar} ??` : '' : ''}`
                                                    : "?????? ????????????????."
                                            }
                                        ]
                                        :
                                        [
                                            {
                                                name: isName ? !/^\s*$/.test(recipe?.name) ? recipe?.name : "?????????? ?????? ????????????????" : "?????????? ?????? ????????????????",
                                                ingridients: [],
                                                steps: isSteps ? recipe?.instructions?.map((step) => step?.display_text) : [],
                                                description: isDesc ?
                                                    `${recipe?.description != null && recipe?.description} ${recipe?.prep_time_minutes != null ? `\n????????????????????: ${recipe?.prep_time_minutes} ??????????` : ''} ${recipe?.cook_time_minutes != null ? `\n??????????????: ${recipe?.cook_time_minutes} ??????????` : ''} ${recipe?.num_servings != undefined ? `\n????????????: ${recipe?.num_servings}` : ''} ${isNutrition ? recipe?.nutrition?.protein != undefined ? `\n????????????: ${recipe?.nutrition?.protein} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.calories != undefined ? `\n??????????????: ${recipe?.nutrition?.calories} ????????` : '' : ''} ${isNutrition ? recipe?.nutrition?.carbohydrates != undefined ? `\n??????????????????: ${recipe?.nutrition?.carbohydrates} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.fat != undefined ? `\n??????????: ${recipe?.nutrition?.fat} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.fiber != undefined ? `\n??????????????????: ${recipe?.nutrition?.fiber} ??` : '' : ''} ${isNutrition ? recipe?.nutrition?.sugar != undefined ? `\n????????????: ${recipe?.nutrition?.sugar} ??` : '' : ''}`
                                                    : "?????? ????????????????."
                                            }
                                        ]
                            }
                        }
                    });
                    navigate("/projects/cooking/pages/1");
                    window.scrollTo(0, 0);
                }}
            >
                <div style={{ maxWidth: '500px' }}>
                    <h3 className='mb-4'>???????????????? ????????????, ?????????????? ???????????????????? ??????????????????</h3>
                    <span className={classes.sampleel} data-tooltip="???????????????? ??????????">
                        ????????????????
                        <Toggler
                            checked={isName}
                            setChecked={setIsName}
                        />
                    </span>
                    <span className={classes.sampleel} data-tooltip="???????????????? ??????????">
                        ????????????????
                        <Toggler
                            checked={isDesc}
                            setChecked={setIsDesc}
                        />
                    </span>
                    <span className={classes.sampleel} data-tooltip="???????????? ?????????????????????????? ??????????">
                        ????????????
                        <Toggler
                            checked={isSteps}
                            setChecked={setIsSteps}
                        />
                    </span>
                    <span className={classes.sampleel} style={{ marginBottom: '100px' }} data-tooltip="?????????????????????? ???????????????? ??????????, ?????????? ??????: ??????????, ????????, ???????????????? ?? ????.">
                        ?????????????????????? ????????????????
                        <Toggler
                            checked={isNutrition}
                            setChecked={setIsNutrition}
                        />
                    </span>
                </div>
            </Modal>
        </div>
    );
};

export default RecipePage;