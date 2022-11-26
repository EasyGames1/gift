import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import Recipes from '../../Recipes/Recipes';
import { useFetching } from '../../../../hooks/useFetching';
import PostService from '../../../../API/PostService';
import { useParams, Link } from 'react-router-dom';
import DishesEditor from '../../DishesEditor/DishesEditor';
import MyDishes from '../../MyDishes/MyDishes';
import Storage from '../../../../API/Storage';
import List from '../../List/List';


const CookingPage = (props) => {
    const [liked, setLiked] = useState(Storage.getUserData('data')?.extended?.cooking?.liked ? [...Storage.getUserData('data')?.extended?.cooking?.liked] : []);
    const params = useParams();
    const [isRecipes, setIsRecipes] = useState(params?.list <= 1 ? props?.isRecipes || false : true);
    const [recipes, setRecipes] = useState('');
    const [fetchRecipes, isLoadingRecipes, errorRecipes] = useFetching(async () => {
        if (!props?.isRecipesForbidden) {
            const response = await PostService?.getRecipes(params?.list == 1 ? 0 : params?.list * props?.recipesLimit || 0, props?.recipesLimit);
            setRecipes(response?.data);
            setIsLoading(false);
        };
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(isLoadingRecipes);
    }, [isLoadingRecipes]);

    useEffect(() => {
        if (isRecipes) {
            fetchRecipes();
        };
    }, [isRecipes, params?.list]);
    useEffect(() => {
        setLiked(Storage.getUserData('data')?.extended?.cooking?.liked ? [...Storage.getUserData('data')?.extended?.cooking?.liked] : []);
        if (props?.recipesLimit === '') {
            props?.setRecipesLimit(20);
        };
        document.getElementById("title").textContent = "Кулинария";
        return () => {
            setRecipes('');
            document.getElementById("title").textContent = "Подарок";
        };
    }, []);

    return (
        <div>
            <h1 className='mb-4 mt-5 text-center'>Кулинария</h1>
            {
                !props?.isRecipesForbidden &&
                <>
                    <div className='text-center'>
                        <Button className="mb-5" onClick={() => { setIsRecipes(!isRecipes) }}>{isRecipes ? "Скрыть" : "Показать"} готовые блюда</Button><br />
                    </div>
                    {isRecipes &&
                        <Recipes
                            theme={props?.theme}
                            recipes={recipes}
                            setRecipes={setRecipes}
                            isLoadingRecipes={isLoadingRecipes}
                            error={errorRecipes}
                            count={recipes?.count}
                            recipesLimit={props?.recipesLimit}
                            current={params?.list || 0}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            isReadyRecipesImages={props?.isReadyRecipesImages}
                            setIsReadyRecipesImages={props?.isReadyRecipesImages}
                            isRecipesTranslate={props.isRecipesTranslate}
                            setIsRecipesTranslate={props.setIsRecipesTranslate}
                        />
                    }
                </>
            }
            {
                liked.length > 0 &&
                <>
                    <h1 id="liked" className='text-center mb-4'>Понравившееся</h1>
                    <List theme={props.theme} clickable>
                        {
                            liked?.map((like, index) =>
                                <Link
                                    key={index}
                                    to={`/projects/cooking/dish/${like}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <li>Блюдо {like}</li>
                                </Link>
                            )
                        }
                    </List>
                </>
            }
            <MyDishes
                theme={props?.theme}
                needToResetMyDishes={props.needToResetMyDishes}
                setNeedToResetMyDishes={props.setNeedToResetMyDishes}
                deleteRecipesConfirm={props.deleteRecipesConfirm}
                setDeleteRecipesConfirm={props.setDeleteRecipesConfirm}
            />
            <DishesEditor
                theme={props?.theme}
                recipesEditorDefault={props?.recipesEditorDefault}
                setNeedToResetMyDishes={props.setNeedToResetMyDishes}
            />
        </div>
    );
};

export default CookingPage;