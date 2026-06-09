import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "WeatherAPI backend is running" });
});

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Weather API key is missing. Add WEATHER_API_KEY in backend/.env."
      });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({ error: "City name is required" });
    }

    const encodedCity = encodeURIComponent(city.trim());
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    return res.json({
      city: data.name,
      temperature: data.main?.temp,
      temp: data.main?.temp,
      humidity: data.main?.humidity,
      wind: data.wind?.speed,
      condition: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon
    });
  } catch (error) {
    if (error.response) {
      const status = error.response.status === 404 ? 404 : 502;
      return res.status(status).json({
        error: "Weather API request failed",
        details: error.response.data || error.response.statusText
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`WeatherAPI backend running on port ${PORT}`);
});
