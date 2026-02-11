const Forecast = ({ forecast }) => {
  const dailyData = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="bg-white/20 dark:bg-white/10 backdrop-blur rounded-xl p-6 text-white">
      <h3 className="text-2xl font-bold mb-5">5-Day Forecast</h3>

      <div className="grid grid-cols-5 gap-4 text-center text-lg">
        {dailyData.slice(0, 5).map((item, i) => {
          const icon = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

          return (
            <div key={i}>
              <p>
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img src={iconUrl} className="mx-auto w-6 h-6" />
              <p>{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
