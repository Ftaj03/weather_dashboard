// This is a LIMITED test key - only works for a few cities
const API_KEY = "452db16970819a7f48350f8050429d3a";
export const fetchWeather = async (city) => {
  try {
    console.log("Fetching weather for:", city);
    
    // Get current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!currentRes.ok) {
      if (currentRes.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      }
      if (currentRes.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      throw new Error(`API Error: ${currentRes.status}`);
    }
    
    const current = await currentRes.json();

    // Get forecast using coordinates
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!forecastRes.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    
    const forecast = await forecastRes.json();

    return { current, forecast };
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// Demo data for testing when API key is invalid
export const getDemoWeather = (city) => {
  return {
    current: {
      name: city,
      main: { temp: 22, humidity: 65, feels_like: 21 },
      weather: [{ description: "Partly cloudy", icon: "02d" }],
      wind: { speed: 5.2 }
    },
    forecast: {
      list: Array(40).fill().map((_, i) => ({
        dt: Date.now() / 1000 + (i * 10800),
        main: { temp: 20 + Math.sin(i) * 5 },
        weather: [{ icon: "02d", description: "Partly cloudy" }]
      }))
    }
  };
};