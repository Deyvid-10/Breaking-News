import React, {useEffect} from 'react';
import Header from "./Header";
import Firt from './Firt_news';
import List from './List_article';
import Footer from './Footer';

function Sport() {

  // title of the page
  useEffect(()=>{
    document.title = "Deporte - Noticias Hoy"
  }, [])
  

  return (
    <div>
      <Header/>
      <div className='lg:p-0 px-2 mx-auto newCustomContainer'>
        <div className='mb-2'>
          <Firt category = "/sport"/>
        </div>
        <List category = "/sport"/>
      </div>
      <Footer/>
    </div>
  );
  }
  
  export default Sport;