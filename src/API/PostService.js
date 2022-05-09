import axios from 'axios';
import { weather, tasty } from '../utils/keys';

export default class PostService {
    static async getWeather(lat, lon) {
        return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lon,
                appid: weather,
                units: 'metric',
                lang: 'ru'
            }
        });
    };
    static async getWeatherForecast(lat, lon) {
        return await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                lat: lat,
                lon: lon,
                appid: weather,
                units: 'metric',
                lang: 'ru'
            }
        });
    };
    static async getRecipes(from, size) {
        return await axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: { from: from, size: size },
            headers: {
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
                'X-RapidAPI-Key': tasty
            }
        });
    };
    static async getRecipe(id) {
        return await axios.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
            params: { id: id },
            headers: {
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
                'X-RapidAPI-Key': tasty
            }
        });
    };
};