import React from 'react';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const getWeatherIcon = (icon) => 
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-blue-100 mt-1">{data.weather?.[0]?.description}</p>
        </div>
        <img 
          src={getWeatherIcon(data.weather?.[0]?.icon)} 
          alt="weather"
          className="w-16 h-16"
        />
      </div>
      
      <div className="mt-4">
        <div className="text-6xl font-bold">
          {Math.round(data.main?.temp)}°C
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-blue-100 text-sm">Humidity</p>
            <p className="text-xl font-semibold">{data.main?.humidity}%</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Wind Speed</p>
            <p className="text-xl font-semibold">{data.wind?.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;