"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CityDashboard.module.css';
import Autosuggest from 'react-autosuggest';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from 'react-icons/wi';

// Custom Hook for Weather Data Fetching
const useWeatherData = (cities) => {
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    const fetchWeatherData = useCallback(async () => {
        setLoading(true);
        setErrors({});
        const data = {};
        const errorMessages = {};

        await Promise.all(
            cities.map(async (city) => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`
                    );
                    if (!response.ok) {
                        throw new Error(`Could not fetch data for ${city}. Status: ${response.status}`);
                    }
                    const cityWeather = await response.json();
                    data[city] = cityWeather;
                } catch (err) {
                    errorMessages[city] = `Failed to load weather data for ${city}`;
                }
            })
        );

        setWeatherData(data);
        setErrors(errorMessages);
        setLoading(false);
    }, [cities, API_KEY]);

    useEffect(() => {
        if (cities.length) {
            fetchWeatherData();

            const interval = setInterval(fetchWeatherData, 300000);
            return () => clearInterval(interval);
        } else {
            setLoading(false);
        }
    }, [cities, fetchWeatherData]);

    return { weatherData, loading, errors };
};

// Get Weather Icon Based on Condition
const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <WiCloud />;
    if (weatherId >= 300 && weatherId < 500) return <WiRain />;
    if (weatherId >= 500 && weatherId < 600) return <WiRain />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow />;
    if (weatherId === 800) return <WiDaySunny />;
    if (weatherId > 800) return <WiCloud />;
    return <WiFog />;
};

function CityDashboard() {
    const [cities, setCities] = useState(() => JSON.parse(localStorage.getItem('cities')) || []);
    const [newCity, setNewCity] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities]);

    const { weatherData, loading, errors } = useWeatherData(cities);

    const addCity = useCallback(() => {
        const formattedCity = newCity.trim().toLowerCase();
        if (!formattedCity) {
            alert("Please enter a valid city name.");
        } else if (!cities.includes(formattedCity)) {
            setCities((prevCities) => [...prevCities, formattedCity]);
            setNewCity('');
        } else {
            alert("City already added.");
        }
    }, [newCity, cities]);

    const removeCity = useCallback((cityToRemove) => {
        setCities((prevCities) => prevCities.filter((city) => city !== cityToRemove));
    }, []);

    const convertTemperature = useCallback((temp) => (isCelsius ? temp : (temp * 9) / 5 + 32), [isCelsius]);

    const fetchCitySuggestions = useCallback((query) => {
        setCitySuggestions([
            { name: 'London' },
            { name: 'Paris' },
            { name: 'New York' },
        ].filter(city => city.name.toLowerCase().includes(query.toLowerCase())));
    }, []);

    const handleSearchChange = useCallback((event, { newValue }) => {
        setNewCity(newValue);
        fetchCitySuggestions(newValue);
    }, [fetchCitySuggestions]);

    const onSuggestionsFetchRequested = useCallback(({ value }) => {
        fetchCitySuggestions(value);
    }, [fetchCitySuggestions]);

    const onSuggestionsClearRequested = useCallback(() => {
        setCitySuggestions([]);
    }, []);

    const inputProps = useMemo(() => ({
        placeholder: "Enter city name",
        value: newCity,
        onChange: handleSearchChange,
    }), [newCity, handleSearchChange]);

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Weather Dashboard</h1>

            <div className={styles.cityInput}>
                <Autosuggest
                    suggestions={citySuggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={(suggestion) => suggestion.name}
                    renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
                    inputProps={inputProps}
                />
                <button onClick={addCity} className={styles.addButton}>Add City</button>
            </div>

            <button onClick={() => setIsCelsius(!isCelsius)} className={styles.tempToggle}>
                {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </button>

            {cities.length === 0 && <p className={styles.info}>No cities added yet. Add a city to get started!</p>}

            <ul className={styles.cityList}>
                {cities.map((city) => (
                    <li key={city} className={styles.cityCard}>
                        <h3>{city}</h3>
                        {loading ? (
                            <p className={styles.loading}>Loading weather data...</p>
                        ) : errors[city] ? (
                            <p className={styles.error}>{errors[city]}</p>
                        ) : weatherData[city] ? (
                            <div className={styles.weatherInfo}>
                                <p>{getWeatherIcon(weatherData[city].list[0].weather[0].id)}</p>
                                <p>Temperature: {convertTemperature(weatherData[city].list[0].main.temp)}°{isCelsius ? 'C' : 'F'}</p>
                                <p>Condition: {weatherData[city].list[0].weather[0].description}</p>
                                <p>Humidity: {weatherData[city].list[0].main.humidity}%</p>
                                <p>Wind Speed: {weatherData[city].list[0].wind.speed} m/s</p>
                                <p>Last Updated: {new Date(weatherData[city].list[0].dt * 1000).toLocaleString()}</p>

                                <ul className={styles.forecastList}>
                                    {weatherData[city].list.slice(0, 5).map((forecast, index) => (
                                        <li key={index} className={styles.forecastItem}>
                                            <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                                            <p>{forecast.weather[0].description}</p>
                                            <p>Temp: {convertTemperature(forecast.main.temp)}°{isCelsius ? 'C' : 'F'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No data available</p>
                        )}
                        <button onClick={() => removeCity(city)} className={styles.removeButton}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CityDashboard;
