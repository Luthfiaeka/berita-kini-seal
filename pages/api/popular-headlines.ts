import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Headline {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

interface ApiResponse {
  popularNews: Headline[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | { error: string }>) {
  try {
    const categories = ['terbaru', 'nasional', 'internasional', 'olahraga', 'teknologi', 'hiburan'];
    const responses = await Promise.all(
      categories.map(category => axios.get(`https://api-berita-indonesia.vercel.app/cnn/${category}`))
    );
    const allHeadlines: Headline[] = responses.flatMap(response => response.data.data || []);
    const sortedHeadlines = allHeadlines.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const latestHeadlines = sortedHeadlines.slice(0, 3);
    res.status(200).json({ popularNews: latestHeadlines });
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
