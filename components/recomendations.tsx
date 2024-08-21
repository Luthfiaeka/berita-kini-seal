import React, { useState, ChangeEvent } from 'react';
import { useRecommendedNews } from '../hooks/useFetchRecommendations';
import styles from '../styles/recommendation.module.css';
import { useRouter } from 'next/router';

interface NewsItem {
  id: string;
  title: string;
  thumbnail: string;
  category?: string;
  pubDate: string;
  content?: string; 
  link: string; 
}


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Tanggal tidak valid' : date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Recommendations: React.FC = () => {
  const router = useRouter();
  const { recommendedNews, isLoading, error } = useRecommendedNews();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 8;

  const handleNewsClick = (link: string) => {
    window.open(link, '_blank'); 
  };

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;


  const filteredNews = recommendedNews.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    const range = [];
    const maxPageButtons = 5; 

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          range.push(i);
        }
        range.push('...');
        range.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1);
        range.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          range.push(i);
        }
      } else {
        range.push(1);
        range.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          range.push(i);
        }
        range.push('...');
        range.push(totalPages);
      }
    }

    return range;
  };

  return (
    <div>
    
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.indicator}></div>
          <h2 className={styles.title}>Rekomendasi Untuk Anda</h2>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
        </div>
      </div>

      <div className={styles.newsList}>
        {selectedNews.map((item: NewsItem) => (
          <div
            key={item.id}
            className={styles.newsItem}
            onClick={() => handleNewsClick(item.link)} 
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.thumbnail}
            />
            <h3 className={styles.titleText}>
              {item.title}
            </h3>
            <div className={styles.info}>
              <span className={styles.category}>
                {item.category || 'Kategori'}
              </span>
              <span className={styles.separator}>•</span>
              <span className={styles.date}>{formatDate(item.pubDate)}</span>
            </div>
          </div>
        ))}
      </div>

    
      <div className={styles.pagination}>
        <div className={styles.info}>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} results
        </div>
        <div className={styles.paginationControls}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <div className={styles.pageNumbers}>
            {getPaginationRange().map((item, index) => (
              <React.Fragment key={index}>
                {item === '...' ? (
                  <span className={styles.ellipsis}>...</span>
                ) : (
                  <button
                    onClick={() => handlePageClick(item as number)}
                    className={`${styles.pageButton} ${currentPage === item ? styles.active : ''}`}
                  >
                    {item}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
