
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
