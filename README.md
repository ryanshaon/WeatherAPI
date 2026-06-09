# WeatherAPI

WeatherAPI is a full-stack weather search application that lets users search for any city and instantly view live weather information using the OpenWeather API.

## Overview

This project was built to strengthen frontend development, API integration, and backend API-handling skills. The frontend provides a clean weather dashboard experience, while the backend securely handles requests to the public weather API without exposing the API key in the browser.

## Features

- Search weather by city name
- Live temperature, humidity, wind speed, and condition display
- Celsius and Fahrenheit toggle
- Weather icon support from OpenWeather
- Express backend API proxy
- Environment-based API key configuration
- Responsive React interface
- Clean frontend/backend folder structure

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Heroicons

### Backend

- Node.js
- Express.js
- Axios
- OpenWeather API
- Dotenv

## Project Structure

```text
WeatherAPI/
├── backend/       # Express API that connects to OpenWeather
├── frontend/      # React + Vite weather dashboard
├── package.json   # Root helper scripts
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ryanshaon/WeatherAPI.git
cd WeatherAPI
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env` with your OpenWeather API key:

```env
PORT=8000
WEATHER_API_KEY=your_openweather_api_key_here
```

Frontend configuration:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Run locally

Open two terminals.

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

Default local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

## API Endpoint

```text
GET /api/weather?city=London
```

Example response:

```json
{
  "city": "London",
  "temp": 12.4,
  "humidity": 78,
  "wind": 4.2,
  "condition": "broken clouds",
  "icon": "04d"
}
```

## Status

Active student project. Cleaned and structured for portfolio review, future deployment, and continued improvement.

## Future Improvements

- Add five-day forecast support
- Add geolocation-based weather
- Add recent search history
- Add loading skeletons and better error states
- Deploy frontend and backend with production environment variables
