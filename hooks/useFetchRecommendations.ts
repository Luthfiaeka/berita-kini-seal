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
        const categories = ['nasional', 'terbaru', 'internasional', 'teknologi', 'olahraga', 'hiburan'];
        const responses = await Promise.all(
          categories.map(category => axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`))
        );
  

        const allHeadlines: Post[] = responses.flatMap((response, index) =>
          response.data.data.posts.map((post: Post) => ({
            ...post,
            category: categories[index], 
          }))
        );
  

        const sortedHeadlines = allHeadlines.sort((a, b) => {
          const categoryOrderA = categories.indexOf(a.category || '');
          const categoryOrderB = categories.indexOf(b.category || '');
          
          if (categoryOrderA !== categoryOrderB) {
            return categoryOrderA - categoryOrderB;
          } else {
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          }
        });
  
        setRecommendedNews(sortedHeadlines);
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
