"use client"
// https://openweathermap.org/

import { useState } from 'react';

export default function HomePage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<{name:string,weather:any[],main:{humidity:number,temp:string},wind:Record<string,any>,sys:Record<string, any>}|null>(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name');
            return;
        }

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setWeather(null);
            } else {
                setWeather(data);
                setError('');
            }
        } catch (err) {
            setError('Failed to fetch weather data');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                style={{ padding: '8px', marginRight: '10px' }}
            />
            <button onClick={fetchWeather} style={{ padding: '8px 16px' }}>
                Get Weather
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Weather in {weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}