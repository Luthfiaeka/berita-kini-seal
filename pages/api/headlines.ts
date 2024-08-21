import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Post {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

interface ApiResponse {
  posts: Post[];
}

const formatDate = (dateString: string): string => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | { error: string }>) {
  try {
    const categories = ['terbaru', 'nasional', 'internasional', 'olahraga', 'teknologi', 'hiburan'];
    const responses = await Promise.all(
      categories.map(category => axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`))
    );
    const allPosts: Post[] = responses.map(response => {
      const posts = response.data.data.posts || [];
      return posts.length > 0 ? posts[0] : null;
    }).filter(post => post !== null) as Post[];
    const uniquePosts = Array.from(new Map(allPosts.map(post => [post.link, post])).values());
    const formattedPosts = uniquePosts.map(post => ({
      ...post,
      pubDate: formatDate(post.pubDate),
    }));

    res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Terjadi kesalahan yang tidak terduga' });
    }
  }
}
