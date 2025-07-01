import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Crop {
  commodity: string;
  market: string;
  district: string;
  state: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

const CropPrices: React.FC = () => {
  const [cropData, setCropData] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchData = (searchCity: string, searchType: string) => {
    setLoading(true);
    const encodedCity = encodeURIComponent(searchCity);
    const url = searchType
      ? `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${import.meta.env.VITE_PRICE_API_KEY}&filters[district]=${encodedCity}&filters[commodity]=${encodeURIComponent(searchType)}`
      : `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${import.meta.env.VITE_PRICE_API_KEY}&format=json&filters[district]=${encodedCity}`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.records && response.data.records.length > 0) {
          setCropData(response.data.records);
        } else {
          // alert('No data found for the search. Showing default data.');
          fetchData('Ahmedabad', '');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crop data:', error);
        setLoading(false);
      });
    };
    
    console.log(cropData)
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const searchCity = city.trim() || 'Ahmedabad';
    const searchType = type.trim() || '';
    setCurrentIndex(0);
    fetchData(searchCity, searchType);
  };

  useEffect(() => {
    fetchData('Ahmedabad', '');
  }, []);

  const showNextCrop = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cropData.length);
  };

  const showPrevCrop = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cropData.length) % cropData.length);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter City (District)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter Crop Type (Commodity)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={showPrevCrop} className="bg-gray-500 text-white p-2 rounded">◀</button>
          {cropData.length > 0 && (
            <div className="border p-4 rounded shadow bg-green-100">
              <h2 className="text-xl font-bold mb-2">{cropData[currentIndex].commodity}</h2>
              <p><strong>Market:</strong> {cropData[currentIndex].market}</p>
              <p><strong>District:</strong> {cropData[currentIndex].district}</p>
              <p><strong>State:</strong> {cropData[currentIndex].state}</p>
              <p><strong>Date:</strong> {cropData[currentIndex].arrival_date}</p>
              <p><strong>Min Price:</strong> ₹{cropData[currentIndex].min_price}</p>
              <p><strong>Max Price:</strong> ₹{cropData[currentIndex].max_price}</p>
              <p><strong>Modal Price:</strong> ₹{cropData[currentIndex].modal_price}</p>
            </div>
          )}
          <button onClick={showNextCrop} className="bg-gray-500 text-white p-2 rounded">▶</button>
        </div>
      )}
    </div>
  );
};

export default CropPrices;
