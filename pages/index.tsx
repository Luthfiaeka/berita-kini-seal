import React from 'react';
import HeadlineList from '../components/headline';
import  PopularHeadlines from '../components/populernews'

import Recommendations from '../components/recomendations';
import Banner from '../components/banner';
import Layout from '../layout/Layout';
export default function Home() {
  

  return (
    <div>
        <Layout>
        <div style={{ paddingTop: '80px' }}>
        <HeadlineList />
        <PopularHeadlines />
        
        <Recommendations/>
        <Banner/>

        </div>
        </Layout>
      
  
    </div>
  );
}
