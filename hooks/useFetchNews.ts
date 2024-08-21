import { useState, useEffect } from 'react';
import axios from 'axios';
interface Post {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
}
interface UseHeadlinesReturn {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}
export const useHeadlines = (): UseHeadlinesReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('/api/headlines'); // Ganti dengan URL API yang sesuai
        setPosts(response.data.posts);
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

    fetchHeadlines();
  }, []);

  return { posts, isLoading, error };
};
