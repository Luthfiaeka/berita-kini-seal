import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/banner.module.css'; 

const images = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpeg'
];

const Banner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bannerWrapper}>
      <div 
        className={styles.bannerContainer}
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.bannerImage}
          >
            <Image
              src={image}
              alt={`Banner ${index}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <div className={styles.navigationDots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
