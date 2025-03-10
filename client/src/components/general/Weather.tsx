import useProfileStore from '@/store/profileStore';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}

const WeatherComponent: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');

  const { profile } = useProfileStore()

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = useCallback(async (city: string | null) => {
    setLoading(true);
    setError(null);
    try {

      if (!city) {
        throw new Error("City not found")
      }

      const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

      const response = await axios.get(uri);

      if (response.status !== 200) {
        throw new Error("Failed to fetch weather data");
      }

      const json: WeatherData = response.data;
      setData(json);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchWeather(profile.isFarmer ? profile.location.district : null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className='flex flex-col items-center p-6 m-6 bg-blue-200 rounded-xl w-80 h-80'>
      <h2 className='font-bold mb-2'>{data.name} Weather</h2>
      <p className='capitalize'>{data.weather[0].description}</p>
      <div className='text-2xl p-4'>{Math.round(data.main.temp)} °C</div>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt='weather icon'
        className='mb-4'
      />
      <div className='flex mt-auto'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name'
          className='p-2 rounded-l-md border'
        />
        <button
          onClick={handleSearch}
          className='p-2 bg-blue-500 text-white rounded-r-md'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default WeatherComponent;
