import React, { useState } from "react";
import { ArrowPathIcon, SunIcon } from "@heroicons/react/24/solid";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);

  const convertTemp = (tempC) => {
    return unit === "C" ? tempC : (tempC * 9) / 5 + 32;
  };

  const getWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/weather?city=${encodeURIComponent(trimmedCity)}`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setWeather(null);
        setError(data.error || "City not found");
        return;
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError("Could not connect to the weather server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-500 p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-full max-w-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow mb-6 flex justify-center items-center gap-2">
          <SunIcon className="w-9 h-9 text-yellow-300" />
          WeatherAPI
        </h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-xl bg-white/80 outline-none text-gray-800 placeholder-gray-500 shadow-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <button
            onClick={getWeather}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 px-5 py-3 rounded-xl text-white font-semibold shadow-lg transition"
          >
            {loading ? "Loading" : "Search"}
          </button>
        </div>

        {weather && (
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setUnit("C")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                unit === "C" ? "bg-white text-blue-600 shadow" : "bg-white/20 text-white"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit("F")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                unit === "F" ? "bg-white text-blue-600 shadow" : "bg-white/20 text-white"
              }`}
            >
              °F
            </button>
          </div>
        )}

        {error && <p className="text-red-100 font-semibold mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 bg-white/20 backdrop-blur-2xl rounded-2xl p-6 text-white shadow-inner">
            <h2 className="text-3xl font-bold mb-1">{weather.city}</h2>

            {weather.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="Weather condition icon"
                className="mx-auto drop-shadow-xl"
              />
            )}

            <p className="text-4xl font-bold mt-2">
              {convertTemp(weather.temp).toFixed(1)}°{unit}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
              <p className="bg-white/20 p-3 rounded-xl">
                Humidity: <span className="font-semibold">{weather.humidity}%</span>
              </p>
              <p className="bg-white/20 p-3 rounded-xl">
                Wind: <span className="font-semibold">{weather.wind} m/s</span>
              </p>
              <p className="col-span-2 bg-white/20 p-3 rounded-xl capitalize">
                Condition: <span className="font-semibold">{weather.condition}</span>
              </p>
            </div>

            <button
              onClick={getWeather}
              className="mt-6 flex mx-auto items-center gap-2 bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-xl shadow-lg"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
