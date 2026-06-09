# WeatherAPI Backend

Express backend for the WeatherAPI app.

## What it does

- Receives city search requests from the frontend
- Calls the OpenWeather API securely from the backend
- Returns cleaned weather data to the frontend
- Keeps the weather API key out of frontend code

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

```env
PORT=8000
WEATHER_API_KEY=your_openweather_api_key_here
```

## Route

```text
GET /api/weather?city=Hyderabad
```
