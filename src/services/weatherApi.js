const API_KEY = "0128a90d4ebad91cbed2b40aac87c474";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeatherByCity = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.json();
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return res.json();
};

export const getFiveDayForecast = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.json();
};