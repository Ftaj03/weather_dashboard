import React, { useState, useEffect } from 'react';
import { fetchWeather, getDemoWeather } from './services/weather';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [usingDemo, setUsingDemo] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setUsingDemo(false);
    
    try {
      const { current, forecast } = await fetchWeather(city);
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      console.log("Using demo data instead");
      // Use demo data if API fails
      const demo = getDemoWeather(city);
      setWeatherData(demo.current);
      setForecastData(demo.forecast);
      setUsingDemo(true);
      setError(`Demo Mode: ${err.message}. Showing sample data for ${city}.`);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (weatherData && !favorites.includes(weatherData.name)) {
      setFavorites([...favorites, weatherData.name]);
    }
  };

  const removeFromFavorites = () => {
    if (weatherData) {
      setFavorites(favorites.filter(city => city !== weatherData.name));
    }
  };

  const isFavorite = weatherData && favorites.includes(weatherData.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          🌤️ Weather Dashboard
        </h1>
        <p className="text-center text-blue-200 mb-8">
          Get current weather and 5-day forecast
        </p>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        <Favorites favorites={favorites} onSelect={handleSearch} />
        
        {error && (
          <div className={`${usingDemo ? 'bg-yellow-500/20 border-yellow-500' : 'bg-red-500/20 border-red-500'} border rounded-lg px-4 py-3 mb-4 text-white`}>
            {error}
          </div>
        )}
        
        {weatherData && (
          <div>
            <div className="flex justify-end gap-2 mb-4">
              {isFavorite ? (
                <button
                  onClick={removeFromFavorites}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition flex items-center gap-2"
                >
                  ⭐ Remove from Favorites
                </button>
              ) : (
                <button
                  onClick={addToFavorites}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition flex items-center gap-2"
                >
                  ☆ Add to Favorites
                </button>
              )}
            </div>
            <WeatherCard data={weatherData} />
            <Forecast data={forecastData} />
            {usingDemo && (
              <div className="mt-4 text-center text-yellow-300 text-sm">
                ⚠️ Showing demo data. Add your OpenWeatherMap API key to get real weather data.
              </div>
            )}
          </div>
        )}
        
        {!weatherData && !loading && !error && (
          <div className="text-center text-gray-300 mt-12">
            <div className="text-6xl mb-4">🌍</div>
            <p>Search for a city to see weather information</p>
            <p className="text-sm mt-2 text-gray-400">
              Examples: London, Tokyo, New York, Paris
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;