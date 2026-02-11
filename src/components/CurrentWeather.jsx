const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-white/20 dark:bg-white/10 backdrop-blur rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="capitalize text-base">{weather.weather[0].description}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3 text-center">
        <div>
          <p className="text-3xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-base opacity-80">Temp</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {Math.round(weather.main.feels_like)}°C
          </p>
          <p className="text-base opacity-80">Feels Like</p>
        </div>

        <div>
          <p className="text-3xl font-bold">{weather.main.humidity}%</p>
          <p className="text-base opacity-80">Humidity</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
