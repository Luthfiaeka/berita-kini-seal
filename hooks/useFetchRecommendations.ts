import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
    id: string;
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
}

interface UseRecommendedNewsReturn {
  recommendedNews: Post[];
  isLoading: boolean;
  error: string | null;
}

export const useRecommendedNews = (): UseRecommendedNewsReturn => {
  const [recommendedNews, setRecommendedNews] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedNews = async () => {
      try {
        const categories = ['terbaru', 'nasional', 'internasional', 'olahraga', 'teknologi', 'hiburan'];
        const responses = await Promise.all(
          categories.map(category => axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`))
        );
        const allHeadlines: Post[] = responses.flatMap(response => response.data.data.posts || []);
        setRecommendedNews(allHeadlines);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Terjadi kesalahan yang tidak terduga');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedNews();
  }, []);

  return { recommendedNews, isLoading, error };
};
