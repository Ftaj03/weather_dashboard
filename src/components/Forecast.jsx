import React from 'react';

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Get next 5 days (each day has 8 entries, take every 8th)
  const dailyForecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (timestamp) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(timestamp * 1000).getDay()];
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-white mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-3">
        {dailyForecast.map((day, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center text-white hover:bg-white/20 transition">
            <p className="font-medium">{getDayName(day.dt)}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="weather"
              className="w-12 h-12 mx-auto my-2"
            />
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="text-xs text-blue-200 capitalize">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;