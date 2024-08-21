import React from 'react';
import HeadlineList from '../components/headline';
import  PopularHeadlines from '../components/populernews'
import Footer from '../components/footer';
import Header from '../components/header';
import Recommendations from '../components/recomendations';
import Banner from '../components/banner';

export default function Home() {
  

  return (
    <div>
        <Header/>
        <div style={{ paddingTop: '80px' }}>
        <HeadlineList />
        <PopularHeadlines />
        
        <Recommendations/>
        <Banner/>

        </div>
        <Footer/>
    
        
  
    </div>
  );
}
