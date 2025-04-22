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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchWeatherByCity(city)
                .then(setWeatherData)
                .catch((error) => console.error(error));
        }
    }

    return (
        <div className='w-full min-w-[28rem] h-[calc(45%-1rem)] bg-[#111214]  bg-opacity-25 rounded-2xl p-[2rem_1.5rem] flex flex-col justify-center items-center gap-y-[3rem]' >
            {weatherData ? (<>
                <div className="flex flex-col gap-y-[1rem]">
                    <div className="flex items-center gap-[1rem]">
                        <button
                            type='button'
                            onClick={handleCurrentLocation}
                        >
                            <i className='bx bx-current-location p-1 text-gray-500 hover:text-white cursor-pointer hover:ring-1 hover:ring-purple-500 rounded-full'></i>
                        </button>
                        <div className="font-['comfortaa','sans-serif'] text-[2rem] font-bold text-[#fff]">{weatherData.name}</div>
                    </div>
                    <div className="relative">
                        <input type="text"
                            placeholder='Tell me where'
                            className="search-input w-locationInput h-[3rem] bg-transparent border-b-2 border-indigo-500 text-[#ddd]"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        <button type='button' className=" absolute top-2 right-1 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={handleSearch}>
                            <i className='bx bx-search-alt-2'></i>
                        </button>
                    </div>
                </div>
                <div className="weather-data flex flex-col items-center gap-1">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        className="w-16 h-16"
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
            )}
        </div >
    )
}

export default Weather