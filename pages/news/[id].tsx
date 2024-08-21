import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface Post {
  id: string;
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
}

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api-berita-indonesia.vercel.app/cnn/olahraga`) // Sesuaikan dengan endpoint API
        .then(response => {
          const postData = response.data.data.posts.find((post: Post) => post.id === id);
          setPost(postData || null);
        })
        .catch(error => setError('Terjadi kesalahan saat mengambil data.'))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <Header />
      <div>
        <style jsx>{`
          .postContainer {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .postTitle {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .postImage {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .postDate {
            font-size: 1rem;
            color: #888;
            margin-bottom: 20px;
          }
          .postContent {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #333;
          }
        `}</style>
        <div className="postContainer">
          <h1 className="postTitle">{post.title}</h1>
          <img src={post.thumbnail} alt={post.title} className="postImage" />
          <p className="postDate">
            {new Date(post.pubDate).toLocaleDateString('id-ID')}
          </p>
          <p className="postContent">{post.description}</p>
          {/* Tambahkan konten lain sesuai dengan desain Anda */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;
