import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import styles from '../styles/internasional.module.css'; 
import Header from '../components/header';
import Footer from '../components/footer';

interface Post {
  id: string;
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
}

const Olahraga: React.FC = () => {
  const [headlines, setHeadlines] = useState<Post[]>([]);
  const [recommendedNews, setRecommendedNews] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentHeadlinePage, setCurrentHeadlinePage] = useState<number>(1);
  const [currentRecommendationPage, setCurrentRecommendationPage] = useState<number>(1);
  const [fadeState, setFadeState] = useState<'fade-enter' | 'fade-exit' | 'fade-enter-active' | 'fade-exit-active'>('fade-enter-active');

  const headlinesPerPage = 1;
  const recommendationsPerPage = 12; 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://api-berita-indonesia.vercel.app/cnn/olahraga`);
        const allPosts: Post[] = response.data.data.posts || [];
        setHeadlines(allPosts.slice(0, 3)); 
        setRecommendedNews(allPosts.slice(3)); 
      } catch (error) {
        setError('Terjadi kesalahan saat mengambil data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleHeadlineDotClick = (page: number) => {
    if (page === currentHeadlinePage) return;

    setFadeState('fade-exit'); 

    setTimeout(() => {
      setCurrentHeadlinePage(page); 
      setFadeState('fade-enter'); 
      setTimeout(() => {
        setFadeState('fade-enter-active'); 
      }, 200); 
    }, 200);
  };

  const handleRecommendationPageChange = (page: number) => {
    setCurrentRecommendationPage(page);
  };

  const currentHeadline = headlines[currentHeadlinePage - 1];
  const paginatedRecommendations = recommendedNews.slice(
    (currentRecommendationPage - 1) * recommendationsPerPage,
    currentRecommendationPage * recommendationsPerPage
  );
  const totalRecommendationPages = Math.ceil(recommendedNews.length / recommendationsPerPage);

  return (
    <div>
      <Header/>
      <div className={styles.headlineContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.indicator}></div>
          <h1 className={styles.sectionTitle}>Headlines</h1>
        </div>

        {isLoading && <div className={styles.loading}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {currentHeadline && (
          <div className={`${styles.headlineItem} ${styles[fadeState]}`}>
            <div className={styles.headlineContent}>
              <h2 className={styles.headlineTitle}>{currentHeadline.title}</h2>
              <p className={styles.headlineDescription}>{currentHeadline.description}</p>
              <div className={styles.headlineDate}>
                <FaCalendarAlt className={styles.calendarIcon} />
                <span>{new Date(currentHeadline.pubDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <Link href={currentHeadline.link} target="_blank" rel="noopener noreferrer" className={styles.readMoreLink}>
  Baca Selengkapnya <FiExternalLink className={styles.arrowIcon} />
</Link>
            </div>
            <img
              src={currentHeadline.thumbnail}
              alt={currentHeadline.title}
              className={styles.headlineImage}
            />
          </div>
        )}

        <div className={styles.navigationDots}>
          {headlines.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentHeadlinePage === index + 1 ? styles.active : ''}`}
              onClick={() => handleHeadlineDotClick(index + 1)}
            ></span>
          ))}
        </div>
      </div>

    
      <div className={styles.rekomendasiContainer}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <div className={styles.indicator}></div>
            <h2 className={styles.title}>Rekomendasi Untuk Anda</h2>
          </div>
        </div>

        <div className={styles.newsList}>
  {paginatedRecommendations.map((item: Post) => (
   <Link
   key={item.id}
   href={item.link}
   target="_blank"
   rel="noopener noreferrer"
   className={styles.newsItemLink}
 >
      <div className={styles.newsItem}>
        <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
        <h3 className={styles.titleText}>{item.title}</h3>
        <div className={styles.info}>
          <span className={styles.category}>{item.category || 'Olahraga'}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>{new Date(item.pubDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  ))}
</div>


        <div className={styles.pagination}>
          <button
            onClick={() => handleRecommendationPageChange(currentRecommendationPage - 1)}
            disabled={currentRecommendationPage === 1}
          >
            ← Previous
          </button>
          <span>Page {currentRecommendationPage} of {totalRecommendationPages}</span>
          <button
            onClick={() => handleRecommendationPageChange(currentRecommendationPage + 1)}
            disabled={currentRecommendationPage === totalRecommendationPages}
          >
            Next →
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Olahraga;
