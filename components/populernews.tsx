import React from 'react';
import Link from 'next/link';
import { usePopularNews } from '../hooks/useFetchPopularNews';
import styles from '../styles/populer.module.css';

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const PopularNewsList: React.FC = () => {
  const { popularNews, isLoading, error } = usePopularNews();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Berita Terpopuler</h1>

      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      <div className={styles.newsList}>
        {popularNews.slice(0, 3).map((news, index) => (
          <React.Fragment key={news.link}>
           <Link href={news.link} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
              <div className={styles.newsItem}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.rank}>
                    {index + 1}
                  </div>
                </div>
                <div className={styles.details}>
                  <h2 className={styles.titleText}>
                    {news.title}
                  </h2>
                  <div className={styles.info}>
                    <p className={styles.category}>
                      {news.category || 'Kategori'} 
                    </p>
                    <span style={{ margin: '0 5px' }}>•</span>
                    <p className={styles.date}>{formatDate(news.pubDate)}</p>
                  </div>
                </div>
              </div>
            </Link>
            {index < 2 && (
              <div className={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PopularNewsList;
