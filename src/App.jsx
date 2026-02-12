import { useEffect, useState } from "react";

import {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getFiveDayForecast,
} from "./services/weatherApi";

import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  // Dark Mode Toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Location Weather (with fallback city)
  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );

          const [forecastData] = await Promise.all([
            getFiveDayForecast(weatherData.name),
          ]);

          setWeather(weatherData);
          setForecast(forecastData);
        } catch {
          setError("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      async () => {
        try {
          const [weatherData, forecastData] = await Promise.all([
            getCurrentWeatherByCity("Delhi"),
            getFiveDayForecast("Delhi"),
          ]);

          setWeather(weatherData);
          setForecast(forecastData);
        } catch {
          setError("Unable to load default city");
        } finally {
          setLoading(false);
        }
      },
    );
  }, []);

  // Search by City
  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name 🌍");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const weatherData = await getCurrentWeatherByCity(city);

      if (!weatherData || weatherData.cod === "404") {
        throw new Error("City not found");
      }

      setWeather(weatherData);

      const forecastData = await getFiveDayForecast(city);
      setForecast(forecastData);
    } catch (err) {
      setError("City not found 😢");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center px-3
      bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600
      dark:from-gray-900 dark:via-gray-800 dark:to-black
      transition-all duration-500"
    >
      <div
        className="w-full max-w-ms md:max-w-lg
        bg-white/25 dark:bg-white/10
        backdrop-blur-xl
        rounded-2xl p-4 space-y-5
        text-white
        shadow-[0_25px_70px_rgba(0,0,0,0.35)]
        border border-white/20"
      >
        <div className="text-center space-y-1">
          <h1
            className="
    text-3xl md:text-4xl
    font-bold
    tracking-wider
    text-white 
    drop-shadow-sm
  "
          >
            Weatherly
          </h1>

          <p
            className="
    text-xs md:text-sm
    text-white/60
    italic
  "
          >
            Real-time weather at your fingertips
          </p>
        </div>

        {/* Search */}
        <Search onSearch={handleSearch} dark={dark} setDark={setDark} />

        {/* Loader */}
        {loading && <Loader />}

        {/* Error */}
        {error && <Error message={error} />}

        {/* Weather */}
        {!loading && weather && <CurrentWeather weather={weather} />}
        {!loading && forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;
