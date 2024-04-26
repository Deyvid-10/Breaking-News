import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useParams} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import List from './List_article';


function Search() {

    const { target } = useParams();

    let typeofSearch = ""

    if(target !== undefined)
    {
        typeofSearch = "/search"
    }
    else
    {
        typeofSearch = "/article"
    }

    // title of the page
    useEffect(()=>{
        document.title = `Buscar: ${target} - Noticias Hoy`
    }, [])

  return (
    <div>
        <Header/>
       
        <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
            <List category = {typeofSearch} search = {target} displayFirt = "true" labels = "notView"  />
        </div>
        <Footer/>
    </div>

  );
}

export default Search;
