import React from 'react';
import Header from "./Header";
import Firt from './Firt_news';
import List from './List_article';
import Footer from './Footer';

function Entertainment() {
    return (
      <div>
      <Header/>
      <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
        <div className='mb-2'>
          <Firt category = "/entertainment"/>
        </div>
        <List category = "/entertainment"/>
      </div>
      <Footer/>
    </div>
    );
  }
  
  export default Entertainment;