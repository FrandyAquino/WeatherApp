import styles from './App.module.css';
import { useState } from 'react';
import { FaCloud, FaTint, FaWind, FaThermometerHalf, FaMapMarkerAlt, FaGithub, FaLinkedin, FaLocationArrow, FaCloudscale  } from 'react-icons/fa';

interface WeatherData {
  coord: { lon: number, lat: number };
  weather: { id: number, main: string, description: string, icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: { all: number };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
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
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <h1 className={styles.header}>WeatherApp</h1>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Buscar ciudad..."
            value={city}
            onChange={handleChange}
          />
          <button className={styles.button} onClick={fetchData}>Consultar</button>
        </div>
      </nav>

      <div className={styles.grid}>
        {weatherData && (
          <>
            <div className={`${styles.card} ${styles.mainCard}`}>
              <h2 className={styles.cityName}>
                <FaMapMarkerAlt /> {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className={styles.mainTemp}>
                <div className={styles.mainIcon}>
                  <FaCloud />
                </div>
                <div className={styles.tempValue}>
                  {weatherData.main.temp} °C
                </div>
              </div>
              <p className={styles.weatherDesc}>
                {capitalizeWords(weatherData.weather[0].description)}
              </p>
            </div>
            <div className={styles.bentoGrid}>
              <div className={styles.bentoCard}>
                <FaTint className={styles.icon} />
                <p className={styles.value}>Humedad: {weatherData.main.humidity}%</p>
              </div>
              <div className={styles.bentoCard}>
                <FaThermometerHalf className={styles.icon} />
                <p className={styles.value}>Sensación térmica: {weatherData.main.feels_like} °C</p>
              </div>
              <div className={styles.bentoCard}>
                <FaWind className={styles.icon} />
                <p className={styles.value}>Viento: {weatherData.wind.speed} m/s</p>
              </div>
              <div className={styles.bentoCard}>
                <FaLocationArrow className={styles.icon} />
                <p className={styles.value}>Latitud: {weatherData.coord.lat}</p>
                <p className={styles.value}>Longitud: {weatherData.coord.lon}</p>
              </div>
              <div className={styles.bentoCard}>
                <FaCloudscale className={styles.icon} />
                <p className={styles.value}>Presión: {weatherData.main.pressure} hPa</p>
              </div>
              <div className={styles.bentoCard}>
                <FaCloud className={styles.icon} />
                <p className={styles.value}>Nubes: {weatherData.clouds.all}%</p>
              </div>
            </div>
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <p>Desarrollado por Frandy Aquino</p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/FrandyAquino" target="_blank" rel="noopener noreferrer">
            <FaGithub className={styles.socialIcon} />
          </a>
          <a href="https://www.linkedin.com/in/frandyaquino/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.socialIcon} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
