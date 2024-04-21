import React from 'react';
import Firt from './Firt_news';
import List from './List_article';
import Header from "./Header";
import Footer from './Footer';

function General() {

  

  return (

    <div >
      <Header/>
      <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
        <div className='mb-2'>
          <Firt category = "/general"/>
        </div>
        <List category = "/general"/>
      </div>
      <Footer/>
    </div>
  );
  }
  
  export default General;