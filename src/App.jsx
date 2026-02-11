// import { useEffect, useState } from "react";

// import {
//   getCurrentWeatherByCity,
//   getCurrentWeatherByCoords,
//   getFiveDayForecast,
// } from "./services/weatherApi";

// import Search from "./components/Search";
// import CurrentWeather from "./components/CurrentWeather";
// import Forecast from "./components/Forecast";
// import Loader from "./components/Loader";
// import Error from "./components/Error";

// function App() {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dark, setDark] = useState(false);

//   // 🌙 Dark mode
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//   }, [dark]);

//   // // 📍 Current location weather
//   // useEffect(() => {
//   //   setLoading(true);

//   //   navigator.geolocation.getCurrentPosition(
//   //     async (pos) => {
//   //       try {
//   //         const { latitude, longitude } = pos.coords;

//   //         const data = await getCurrentWeatherByCoords(latitude, longitude);
//   //         setWeather(data);

//   //         const forecastData = await getFiveDayForecast(data.name);
//   //         setForecast(forecastData);
//   //       } catch {
//   //         setError("Unable to fetch location weather");
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     },
//   //     () => {
//   //       setLoading(false);
//   //       setError("Location permission denied");
//   //     },
//   //   );
//   // }, []);

//   // 📍 Current location weather
//   useEffect(() => {
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           const { latitude, longitude } = pos.coords;
//           const data = await getCurrentWeatherByCoords(latitude, longitude);
//           setWeather(data);

//           const forecastData = await getFiveDayForecast(data.name);
//           setForecast(forecastData);
//         } catch {
//           setError("Unable to fetch location weather");
//         } finally {
//           setLoading(false);
//         }
//       },
//       async () => {
//         // 👇 DEFAULT CITY FIX
//         try {
//           const data = await getCurrentWeatherByCity("Delhi");
//           setWeather(data);
//           const forecastData = await getFiveDayForecast("Delhi");
//           setForecast(forecastData);
//         } catch {
//           setError("Unable to load default city");
//         } finally {
//           setLoading(false);
//         }
//       },
//     );
//   }, []);

//   // 🔍 City search
//   const handleSearch = async (city) => {
//     try {
//       setError("");
//       setLoading(true);

//       const data = await getCurrentWeatherByCity(city);
//       setWeather(data);

//       const forecastData = await getFiveDayForecast(city);
//       setForecast(forecastData);
//     } catch {
//       setError("City not found 😢");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-3
//       bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600
//       dark:from-gray-900 dark:via-gray-800 dark:to-black
//       transition-all duration-500"
//     >
//       {/* 🌌 Optional night sky */}

//       {/* 🔥 Glass Card */}
//       <div
//         className="relative w-full max-w-md md:max-w-lg
//         bg-white/25 dark:bg-white/10
//         backdrop-blur-2xl
//         rounded-3xl p-6 space-y-5
//         text-white
//         shadow-[0_25px_70px_rgba(0,0,0,0.35)]
//         border border-white/20
//         animate-fadeIn"
//       >
//         {/* Search */}
//         <Search onSearch={handleSearch} dark={dark} setDark={setDark} />

//         {/* Loader */}
//         {loading && <Loader />}

//         {/* Error */}
//         {error && <Error message={error} />}

//         {/* Weather */}
//         {!loading && weather && <CurrentWeather weather={weather} />}
//         {!loading && forecast && <Forecast forecast={forecast} />}
//       </div>
//     </div>
//   );
// }

// export default App;

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

  // 🌙 Dark Mode Toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // 📍 Location Weather (with fallback city)
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
          setWeather(weatherData);

          const forecastData = await getFiveDayForecast(weatherData.name);
          setForecast(forecastData);
        } catch (err) {
          setError("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      async () => {
        // ❗ If location denied → Default City
        try {
          const weatherData = await getCurrentWeatherByCity("Delhi");
          setWeather(weatherData);

          const forecastData = await getFiveDayForecast("Delhi");
          setForecast(forecastData);
        } catch {
          setError("Unable to load default city");
        } finally {
          setLoading(false);
        }
      },
    );
  }, []);

  // 🔍 Search by City
  const handleSearch = async (city) => {
    try {
      setError("");
      setLoading(true);

      const weatherData = await getCurrentWeatherByCity(city);
      setWeather(weatherData);

      const forecastData = await getFiveDayForecast(city);
      setForecast(forecastData);
    } catch {
      setError("City not found 😢");
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
        {/* 🔍 Search */}
        <Search onSearch={handleSearch} dark={dark} setDark={setDark} />

        {/* ⏳ Loader */}
        {loading && <Loader />}

        {/* ❌ Error */}
        {error && <Error message={error} />}

        {/* 🌦 Weather */}
        {!loading && weather && <CurrentWeather weather={weather} />}
        {!loading && forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;
