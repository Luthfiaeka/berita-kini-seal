import React from 'react';
import styles from '../styles/footer.module.css';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { FaTelegramPlane } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.logoSection}>
                    <div className={styles.logoo}>
                        <img src="./images/white_logo.png" alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>Berita Kini</span>
                    </div>
                    <p className={styles.copy}>&copy; 2023 Berita Kini. All Rights Reserved.</p>
                    <p>Ikuti Kami</p>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="YouTube" className={styles.iconWrapper}>
                            <YouTube className={styles.icon} />
                        </a>
                        <a href="#" aria-label="Instagram" className={styles.iconWrapper}>
                            <Instagram className={styles.icon} />
                        </a>
                        <a href="#" aria-label="Facebook" className={styles.iconWrapper}>
                            <Facebook className={styles.icon} />
                        </a>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <div>
                        <h4>Telusuri</h4>
                        <ul>
                            <li><a href="/">Beranda</a></li>
                            <li><a href="/Hiburan">Kesehatan</a></li>
                            <li><a href="/olahraga">Olahraga</a></li>
                            <li><a href="/nasional">Nasional</a></li>
                            <li><a href="/internasional">Internasional</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Bantuan</h4>
                        <ul>
                            <li><a href="#">Kontak Kami</a></li>
                            <li><a href="#">Laporan Pembajakan</a></li>
                            <li><a href="#">Kebijakan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={styles.redText}>Berlangganan Berita Terbaru</h4>
                        <form className={styles.subscriptionForm}>
                            <input type="email" placeholder="Masukkan email" className={styles.forminput}/>
                            <button type="submit" className={styles.submitButton}>
                                <FaTelegramPlane className={styles.iconsend} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;