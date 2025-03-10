import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";

// Define the type for a single news article
interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string;
}

const News: React.FC = () => {
  const [data, setData] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const newsPerPage = 4;

  const getNews = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=farmer&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setData(res.data.articles);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleNextPage = () => {
    if (currentPage * newsPerPage < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = data.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <Container>
      <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentNews.length > 0 ? (
          currentNews.map((news, index) => (
            <Card key={index} className="relative w-full h-64 rounded-xl overflow-hidden">
              <div
                className="w-full h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${news.urlToImage})` }}
              ></div>
              <CardContent className="p-3 text-center">
                <h2 className="text-sm font-semibold mb-2">{news.title}</h2>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-2 py-1 rounded-md text-xs transition"
                >
                  Read More
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No news available</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline">
        <ChevronLeft />
        </Button>
        <Button onClick={handleNextPage} disabled={indexOfLastNews >= data.length} variant="outline">
        <ChevronRight />
        </Button>
      </div>
    </div>
    </Container>
  );
};

export default News;
