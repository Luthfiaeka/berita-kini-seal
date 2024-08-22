import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/footer.module.css';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { FaTelegramPlane } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.logoSection}>
                    <div className={styles.logoo}>
                        <Image 
                            src="/images/white_logo.png" 
                            alt="Logo" 
                            className={styles.logo} 
                            width={150}  // Sesuaikan dengan lebar gambar yang sesuai
                            height={50}  // Sesuaikan dengan tinggi gambar yang sesuai
                        />
                        <span className={styles.logoText}>Berita Kini</span>
                    </div>
                    <p className={styles.copy}>&copy; 2023 Berita Kini. All Rights Reserved.</p>
                    <p>Ikuti Kami</p>
                    <div className={styles.socialIcons}>
                        <Link href="#" aria-label="YouTube">
                            <div className={styles.iconWrapper}>
                                <YouTube className={styles.icon} />
                            </div>
                        </Link>
                        <Link href="#" aria-label="Instagram">
                            <div className={styles.iconWrapper}>
                                <Instagram className={styles.icon} />
                            </div>
                        </Link>
                        <Link href="#" aria-label="Facebook">
                            <div className={styles.iconWrapper}>
                                <Facebook className={styles.icon} />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <div>
                        <h4>Telusuri</h4>
                        <ul>
                            <li><Link href="/">Beranda</Link></li>
                            <li><Link href="/Hiburan">Kesehatan</Link></li>
                            <li><Link href="/olahraga">Olahraga</Link></li>
                            <li><Link href="/nasional">Nasional</Link></li>
                            <li><Link href="/internasional">Internasional</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Bantuan</h4>
                        <ul>
                            <li><Link href="#">Kontak Kami</Link></li>
                            <li><Link href="#">Laporan Pembajakan</Link></li>
                            <li><Link href="#">Kebijakan</Link></li>
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
