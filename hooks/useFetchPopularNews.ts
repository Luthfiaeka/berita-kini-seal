import { useState, useEffect } from 'react';
import axios from 'axios';
interface Post {
    id:string;
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
}
interface UsePopularNewsReturn {
  popularNews: Post[];
  isLoading: boolean;
  error: string | null;
}
export const usePopularNews = (): UsePopularNewsReturn => {
  const [popularNews, setPopularNews] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        const categories = ['terbaru', 'nasional', 'internasional', 'olahraga', 'teknologi', 'hiburan']; 
        const responses = await Promise.all(
          categories.map(category => axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`))
        );
        const allHeadlines: Post[] = responses.flatMap(response => response.data.data.posts || []);
        const sortedHeadlines = allHeadlines
          .filter((_, index, self) => index === self.findIndex(t => t.title === _.title))
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 3);

        setPopularNews(sortedHeadlines);
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

    fetchPopularNews();
  }, []);

  return { popularNews, isLoading, error };
};
