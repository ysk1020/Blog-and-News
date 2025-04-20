import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather?`, {
            params: {
                lat: latitude,
                lon: longitude,
                units: "metric",
                exclude: "hourly,daily",
                appid: API_KEY,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch weather data", error);
        throw error;
    }
};

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather?`, {
            params: {
                q: city,
                units: "metric",
                appid: API_KEY,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch city weather data", error);
        throw error;
    }
};
