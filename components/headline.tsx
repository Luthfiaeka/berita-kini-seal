import React, { useState } from 'react';
import { useHeadlines } from '../hooks/useFetchNews';
import styles from '../styles/headliner.module.css';
import { FaCalendarAlt } from 'react-icons/fa'; 
import { FiExternalLink } from 'react-icons/fi'; 

const HeadlineList: React.FC = () => {
  const { posts, isLoading, error } = useHeadlines();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 1; 
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPost = posts[(currentPage - 1) * postsPerPage] || null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.headlineContainer}>
      <h1 className={styles.headlineTitle}>Headlines</h1>

      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      <div className={styles.headlineItem}>
        {currentPost ? (
          <>
            <div className={styles.headlineContent}>
              <h2 className={styles.headlineMainTitle}>{currentPost.title}</h2>
              <p className={styles.headlineDescription}>{currentPost.description}</p>
              <div className={styles.headlineDate}>
                <FaCalendarAlt className={styles.calendarIcon} />
                <span>{currentPost.pubDate}</span>
              </div>
              <a href={currentPost.link} target="_blank" rel="noopener noreferrer" className={styles.readMoreLink}>
                Baca Selengkapnya <FiExternalLink className={styles.arrowIcon} />
              </a>
            </div>
            <img
              src={currentPost.thumbnail}
              alt={currentPost.title}
              style={{ width: '300px', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
            />
          </>
        ) : (
          <div className={styles.noHeadline}>No headline available</div>
        )}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt; 
        </button>
        <span>
          {currentPage} dari {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
           &gt;
        </button>
      </div>
    </div>
  );
};

export default HeadlineList;
