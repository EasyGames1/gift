import React, { useEffect, useState } from 'react';
import './App.css';
import Storage from './API/Storage';
import { GlobalStyles } from './components/globalStyles';
import { lightTheme, darkTheme } from './components/Themes';
import { ThemeProvider } from 'styled-components';
import Router from './components/Router/Router';
import { BrowserRouter } from 'react-router-dom';
import Overflow from './components/UI/Overflow/Overflow';
import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css'
import { SoundContext, VibrationContext } from './context';

const App = () => {
  const getGeo = (state) => {
    if (state === "granted") {
      if (isGeo) {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            setCoords({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude
            });
            setAgentModalGeo(false);
          });
        } else {
          alert("Ваш браузер не поддерживает геолокацию. Обновитесь! Иначе за стабильность работы приложения нести ответственность будете Вы.");
        };
        setAgentModalGeo(false);
      };
    };
    if (state === "denied" || state === "prompt") {
      if (isGeo) {
        setAgentModalGeo(true);
      } else {
        setAgentModalGeo(false);
      };
    };
  };
  const geoFunction = () => {
    if (navigator.geolocation) {
      if ("permissions" in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
          getGeo(permissionStatus.state);
          permissionStatus.onchange = function () {
            getGeo(this.state);
          };
        });
      } else {
        if (!Storage.getUserData("data")?.used) {
          alert("У Вас установлен устаревший браузер, не поддерживающий возвращение изменения состояния геолокации. Мы не можем гарантировать стабильную работу этого сайта - за его работоспособность ответственность берёте Вы.");
        };
        getGeo("granted");
      };
    } else {
      alert("Ваш браузер не поддерживает Geolocation API, то есть Вы не сможете воспользоваться сервисами, работающими на основе Вашего местоположения. Обновитесь!");
    };
  };



  const [needToResetMyDishes, setNeedToResetMyDishes] = useState(false);
  const [isReadyRecipesImages, setIsReadyRecipesImages] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.isReadyRecipesImages != undefined
      ? Storage.getUserData("settings")?.extended?.cooking?.isReadyRecipesImages
      : true
  );
  const [recipesEditorDefault, setRecipesEditorDefault] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.recipesEditorDefault != undefined
      ? Storage.getUserData("settings")?.extended?.cooking?.recipesEditorDefault
      : false
  );
  const [recipesLimit, setRecipesLimit] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.recipesLimit
      ? Storage.getUserData("settings")?.extended?.cooking?.recipesLimit
      : 40
  );
  const [recipes, setRecipes] = useState('');
  const [AgentModalGeo, setAgentModalGeo] = useState(false);
  const [theme, setTheme] = useState(Storage.getUserData("settings")?.theme || "dark");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isGeo, setIsGeo] = useState(Storage.getUserData("settings")?.isGeo == undefined ? true : Storage.getUserData("settings")?.isGeo);
  const [isSound, setIsSound] = useState(Storage.getUserData("settings")?.isSound == undefined ? true : Storage.getUserData("settings")?.isSound);
  const [isVibration, setIsVibration] = useState(Storage.getUserData("settings")?.isSound == undefined ? true : Storage.getUserData("settings")?.isSound);
  const [coords, setCoords] = useState('');
  const [isWeatherGraph, setIsWeatherGraph] = useState(
    Storage.getUserData("settings")?.extended?.weather?.isWeatherGraph
      ? Storage.getUserData("settings")?.extended?.weather?.isWeatherGraph
      : false
  );
  const [isForbiddenWeatherGraph, setIsForbiddenWeatherGraph] = useState(
    Storage.getUserData("settings")?.extended?.weather?.isForbiddenWeatherGraph
      ? Storage.getUserData("settings")?.extended?.weather?.isForbiddenWeatherGraph
      : false
  );
  const [isRecipes, setIsRecipes] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.isRecipes
      ? Storage.getUserData("settings")?.extended?.cooking?.isRecipes
      : false
  );
  const [isRecipesForbidden, setIsRecipesForbidden] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.isRecipesForbidden
      ? Storage.getUserData("settings")?.extended?.cooking?.isRecipesForbidden
      : false
  );
  const [deleteRecipesConfirm, setDeleteRecipesConfirm] = useState(
    Storage.getUserData("settings")?.extended?.cooking?.deleteRecipesConfirm
      ? Storage.getUserData("settings")?.extended?.cooking?.deleteRecipesConfirm
      : true
  );
  const [newPurchase, setNewPurchase] = useState(
    Storage.getUserData("settings")?.extended?.shoplist?.newPurchase
      ? Storage.getUserData("settings")?.extended?.shoplist?.newPurchase
      : false
  );
  const [imt, setimt] = useState(
    Storage.getUserData("settings")?.extended?.imt?.imt
      ? Storage.getUserData("settings")?.extended?.imt?.imt
      : false
  )
  const [todoNewDefault, setTodoNewDefault] = useState(
    Storage.getUserData("settings")?.extended?.todo?.newDeafult
      ? Storage.getUserData("settings")?.extended?.todo?.newDeafult
      : false
  );


  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        todo: {
          ...Storage.getUserData("settings")?.extended?.shoplist,
          newDeafult: todoNewDefault
        }
      }
    });
  }, [todoNewDefault]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        imt: {
          ...Storage.getUserData("settings")?.extended?.imt,
          imt: imt
        }
      }
    });
  }, [imt]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        shoplist: {
          ...Storage.getUserData("settings")?.extended?.shoplist,
          newPurchase: newPurchase
        }
      }
    });
  }, [newPurchase]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        cooking: {
          ...Storage.getUserData("settings")?.extended?.cooking,
          isReadyRecipesImages: isReadyRecipesImages
        }
      }
    });
  }, [isReadyRecipesImages]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        cooking: {
          ...Storage.getUserData("settings")?.extended?.cooking,
          recipesEditorDefault: recipesEditorDefault
        }
      }
    });
  }, [recipesEditorDefault]);

  useEffect(() => {
    if (recipesLimit > 40) {
      setRecipesLimit(40);
    } else if (recipesLimit <= 0) {
      {
        setRecipesLimit('');
      };
    } else {
      Storage.setUserData("settings", {
        ...Storage.getUserData("settings"),
        extended: {
          ...Storage.getUserData("settings")?.extended,
          cooking: {
            ...Storage.getUserData("settings")?.extended?.cooking,
            recipesLimit: recipesLimit
          }
        }
      });
    };
  }, [recipesLimit]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        cooking: {
          ...Storage.getUserData("settings")?.extended?.cooking,
          isRecipes: isRecipes
        }
      }
    });
  }, [isRecipes]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        cooking: {
          ...Storage.getUserData("settings")?.extended?.cooking,
          isRecipesForbidden: isRecipesForbidden
        }
      }
    });
    setIsRecipes(isRecipesForbidden ? !isRecipesForbidden : isRecipes);
    setIsReadyRecipesImages(isRecipesForbidden ? !isRecipesForbidden : isReadyRecipesImages);
  }, [isRecipesForbidden]);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
        if (permissionStatus.state === "denied" && isGeo) {
          setAgentModalGeo(true);
        } else {
          setAgentModalGeo(false);
        };
      });
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
        }, () => {
          if (isGeo) {
            setAgentModalGeo(true);
          };
        });
      } else {
        alert("Ну не поддерживает Ваш браузер геолокацию и разрешения. Ну обновитесь, ну пожалуйста!");
      };
    };
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      isGeo: isGeo
    });
  }, [isGeo]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      isSound: isSound
    });
  }, [isSound]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      isVibration: isVibration
    });
  }, [isVibration]);
  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      theme: theme
    });
    window.dispatchEvent(new CustomEvent("scroll", {}));
  }, [theme]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        weather: {
          ...Storage.getUserData("settings")?.extended?.weather,
          isWeatherGraph: isWeatherGraph
        }
      }
    });
  }, [isWeatherGraph]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        weather: {
          ...Storage.getUserData("settings")?.extended?.weather,
          isForbiddenWeatherGraph: isForbiddenWeatherGraph
        }
      }
    });
    setIsWeatherGraph(isForbiddenWeatherGraph ? !isForbiddenWeatherGraph : isWeatherGraph);
  }, [isForbiddenWeatherGraph]);

  useEffect(() => {
    Storage.setUserData("settings", {
      ...Storage.getUserData("settings"),
      extended: {
        ...Storage.getUserData("settings")?.extended,
        cooking: {
          ...Storage.getUserData("settings")?.extended?.cooking,
          deleteRecipesConfirm: deleteRecipesConfirm
        }
      }
    });
  }, [deleteRecipesConfirm]);

  useEffect(() => {
    geoFunction();
    AOS.init({});

    if (
      !Storage.getUserData('data')?.used ||
      Storage.getUserData('data')?.used === false) {
      setSettingsVisible(true);
      Storage.setUserData('data', {
        ...Storage.getUserData('data'),
        used: true
      });
    } else {

    };
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <SoundContext.Provider value={isSound}>
          <VibrationContext.Provider value={isVibration}>
            <BrowserRouter>
              <Overflow
                theme={theme}
                setTheme={setTheme}
                settingsVisible={settingsVisible}
                setSettingsVisible={setSettingsVisible}
                isGeo={isGeo}
                setIsGeo={setIsGeo}
                isWeatherGraph={isWeatherGraph}
                setIsWeatherGraph={setIsWeatherGraph}
                isForbiddenWeatherGraph={isForbiddenWeatherGraph}
                setIsForbiddenWeatherGraph={setIsForbiddenWeatherGraph}
                AgentModalGeo={AgentModalGeo}
                setAgentModalGeo={setAgentModalGeo}
                coords={coords}
              />
              <Router
                theme={theme}
                setTheme={setTheme}
                settingsVisible={settingsVisible}
                setSettingsVisible={setSettingsVisible}
                isGeo={isGeo}
                setIsGeo={setIsGeo}
                isSound={isSound}
                setIsSound={setIsSound}
                isVibration={isVibration}
                setIsVibration={setIsVibration}
                isWeatherGraph={isWeatherGraph}
                setIsWeatherGraph={setIsWeatherGraph}
                isForbiddenWeatherGraph={isForbiddenWeatherGraph}
                setIsForbiddenWeatherGraph={setIsForbiddenWeatherGraph}
                AgentModalGeo={AgentModalGeo}
                setAgentModalGeo={setAgentModalGeo}
                coords={coords}
                isRecipes={isRecipes}
                setIsRecipes={setIsRecipes}
                isRecipesForbidden={isRecipesForbidden}
                setIsRecipesForbidden={setIsRecipesForbidden}
                recipes={recipes}
                setRecipes={setRecipes}
                recipesLimit={recipesLimit}
                setRecipesLimit={setRecipesLimit}
                recipesEditorDefault={recipesEditorDefault}
                setRecipesEditorDefault={setRecipesEditorDefault}
                isReadyRecipesImages={isReadyRecipesImages}
                setIsReadyRecipesImages={setIsReadyRecipesImages}
                needToResetMyDishes={needToResetMyDishes}
                setNeedToResetMyDishes={setNeedToResetMyDishes}
                deleteRecipesConfirm={deleteRecipesConfirm}
                setDeleteRecipesConfirm={setDeleteRecipesConfirm}
                newPurchase={newPurchase}
                setNewPurchase={setNewPurchase}
                imt={imt}
                setimt={setimt}
                todoNewDefault={todoNewDefault}
                setTodoNewDefault={setTodoNewDefault}
              />
            </BrowserRouter>
          </VibrationContext.Provider>
        </SoundContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;