import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for a single news article
interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string;
}

const News: React.FC = () => {
  const [data, setData] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getNews = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=farmer&sortBy=publishedAt&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      setData(res.data.articles);
      setCurrentIndex(0); // Reset to the first news item on new search
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentNews = data[currentIndex];

  return (
    <div className="p-6 flex flex-col items-center">
      {currentNews ? (
        <div
          className="relative bg-cover bg-center bg-no-repeat w-80 h-80 rounded-lg shadow-md overflow-hidden flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(${currentNews.urlToImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Title and Button */}
          <div className="relative z-10 p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">{currentNews.title}</h2>
            <a
              href={currentNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Read more
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No news available</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 bg-gray-300 text-zinc-900 rounded-md transition-colors ${
            currentIndex === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= data.length - 1}
          className={`px-4 py-2 bg-gray-300 text-zinc-900 rounded-md transition-colors ${
            currentIndex >= data.length - 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
