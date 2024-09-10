import styles from './App.module.css';
import { useState } from 'react';

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");

  const APIKEY = import.meta.env.VITE_APIKEY;
  const LANG = import.meta.env.VITE_LANG;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&lang=${LANG}&units=metric`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Weather App</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <input
            className={styles.input}
            type="text"
            placeholder="Ingresa una ciudad"
            value={city}
            onChange={handleChange}
          />
          <button className={styles.button} onClick={fetchData}>Consultar</button>
        </div>
        {weatherData && (
          <div className={`${styles.card} ${styles.mainCard}`}>
            <h2 className={styles.cityName}>{weatherData.name}</h2>
            <div className={styles.mainTemp}>
              <div className={styles.mainIcon}>
              </div>
              <div className={styles.tempValue}>
                {weatherData.main.temp} °C
              </div>
            </div>
            <p className={styles.weatherDesc}>
              {capitalizeWords(weatherData.weather[0].description)}
            </p>
            <p className={styles.value}>Humedad: {weatherData.main.humidity}%</p>
            <p className={styles.value}>Velocidad del viento: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
