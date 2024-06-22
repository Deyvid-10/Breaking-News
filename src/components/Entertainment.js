import React, {useEffect} from 'react';
import Header from "./Header";
import Firt from './Firt_news';
import List from './List_article';
import Footer from './Footer';

function Entertainment() {

    // title of the page
    useEffect(()=>{
      document.title = "Entretenimiento - Noticias Hoy"
    }, [])

    return (
      <div>
      <Header/>
      <div className='lg:p-0 px-2 mx-auto newCustomContainer'>
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