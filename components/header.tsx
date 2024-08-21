import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <img
          src={isScrolled ? './images/white_logo.png' : './images/color_logo.png'}
          alt="Logo"
          className={styles.logoImage}
        />
        <span className={styles.logoText}>Berita Kini</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
          Beranda
        </Link>
        <Link href="/terbaru" className={`${styles.navLink} ${router.pathname === '/terbaru' ? styles.active : ''}`}>
          Terbaru
        </Link>
        <Link href="/hiburan" className={`${styles.navLink} ${router.pathname === '/hiburan' ? styles.active : ''}`}>
          Hiburan
        </Link>
        <Link href="/olahraga" className={`${styles.navLink} ${router.pathname === '/olahraga' ? styles.active : ''}`}>
          Olahraga
        </Link>
        <Link href="/nasional" className={`${styles.navLink} ${router.pathname === '/nasional' ? styles.active : ''}`}>
          Nasional
        </Link>
        <Link href="/internasional" className={`${styles.navLink} ${router.pathname === '/internasional' ? styles.active : ''}`}>
          Internasional
        </Link>
      </nav>
    </header>
  );
};

export default Header;
