import React, { useState, useEffect } from 'react'
import { fetchWeatherByCoordinates } from "../service/WeatherService";
import { fetchWeatherByCity } from "../service/WeatherService";
import { capitalize } from '../utils/Capitalize';

function Weather() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");


    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Geolocation error:", error.message);
                alert("Failed to get current location.");
            }
        );

    }

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if ((location.latitude && location.longitude)) {
            fetchWeatherByCoordinates(location.latitude, location.longitude)
                .then((data) => setWeatherData(data))
                .catch((err) => console.error(err));
        }
    }, [location]);

    const handleSearch = async (e) => {
        e.preventDefault();
        fetchWeatherByCity(city)
            .then(setWeatherData)
            .catch((error) => console.error(error));
    };

    const handleCurrentLocation = (e) => {
        e.preventDefault();
        getCurrentLocation();
    };

    return (
        <div className='w-full min-w-[28rem] h-[calc(55%-2rem)] bg-[#111214] rounded-2xl p-[2rem_1.5rem] flex flex-col justify-center items-center gap-y-[3rem]' >
            {weatherData ? (<>
                <div className="flex flex-col gap-y-[1rem]">
                    <div className="flex items-center gap-[1rem]">
                        <button
                            type='button'
                            className=" p-1 hover:text-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-500 rounded-full"
                            onClick={handleCurrentLocation}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-10 text-[2.5rem] text-[#ddd]"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                            </svg>
                        </button>
                        <div className="font-['comfortaa','sans-serif'] text-[2rem] font-bold text-[#fff]">{weatherData.name}</div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder='Tell me where' className="search-input w-locationInput h-[3rem] bg-transparent border-b-2 border-indigo-500 text-[#ddd]" value={city} onChange={(e) => setCity(e.target.value)} />
                        <button type='button' className=" absolute top-2 right-1 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={handleSearch}>
                            <svg className='w-10 h-10'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="weather-data flex flex-col items-center gap-1">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500 "
                    />
                    <div className="font-['comfortaa','sans-serif'] text-[2rem] font-bold text-[#ddd]">
                        {capitalize(weatherData.weather[0].description.toString())}
                    </div>
                    <div className="font-['comfortaa','sans-serif'] text-[1.5rem] font-bold text-[#ddd]">
                        {weatherData.main.temp} °C
                    </div>
                    {/* <p className="font-['comfortaa','sans-serif'] text-[1rem] text-[#ddd]">Feels Like: {weatherData.main.feels_like}°C</p> */}
                </div>
            </>) : (
                <div className="text-white text-xl animate-pulse">Fetching Weather...</div>
            )
            }
        </div >
    )
}

export default Weather