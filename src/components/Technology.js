import React from 'react';
import Header from "./Header";
import Firt from './Firt_news';
import List from './List_article';
import Footer from './Footer';

function Technology() {
    return (
      <div>
      <Header/>
      <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
        <div className='mb-2'>
          <Firt category = "/technology"/>
        </div>
        <List category = "/technology"/>
      </div>
      <Footer/>
    </div>
    );
  }
  
  export default Technology;