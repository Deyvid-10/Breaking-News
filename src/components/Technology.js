import React, {useEffect} from 'react';
import Header from "./Header";
import Firt from './Firt_news';
import List from './List_article';
import Footer from './Footer';

function Technology() {

    // title of the page
    useEffect(()=>{
      document.title = "Tegnologia - Noticias Hoy"
    }, [])
  

    return (
      <div>
      <Header/>
      <div className='lg:p-0 px-2 mx-auto newCustomContainer'>
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