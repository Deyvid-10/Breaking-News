import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate} from 'react-router-dom';

import Firt from './Firt_news';
import List from './List_article';
import Header from "./Header";
import Footer from './Footer';


function Home() {
    
    

    return (
        
        <div>

            <Header category = "/article"/>

            <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
                <div className="xl:flex lg:block mb-2">
                    
                    <Firt category = "/article"/>

                    <div className="">
                        <div className="lg:w-full">
                                
                            <h1 className='text-2xl p-1 my-2 w-full text-center font-bold border-blue-700 bg-blue-100 border-l-8'>Categorias</h1>

                            <Link to="general">
                                <div className="categories w-full mb-3" id="general">
                                    <div className="bgShadow h-full flex justify-center items-center">
                                        <h2 className="text-white text-2xl font-bold">General</h2>
                                    </div>
                                </div>
                            </Link>
                            <Link to="technology">
                                <div className="categories w-full mb-3" id="technology">
                                    <div className="bgShadow h-full flex justify-center items-center">
                                        <h2  className="text-white text-2xl font-bold">Tegnologia</h2>
                                    </div>
                                </div>
                            </Link>
                            <Link to="sport">
                                <div className="categories w-full mb-3" id="sport">
                                    <div className="bgShadow h-full flex justify-center items-center">
                                        <h2  className="text-white text-2xl font-bold">Deporte</h2>
                                    </div>
                                </div>
                            </Link>

                            
                            <Link to="entertainment">
                                <div className="categories w-full mb-3" id="entertainment">
                                    <div className="bgShadow h-full flex justify-center items-center">
                                        <h2  className="text-white text-2xl font-bold">Entretenimiento</h2>
                                    </div>
                                </div>
                            </Link>

                            
                        </div>
                    </div>
                </div>
                <List category = "/article"/>
            </div>
            <Footer/>
        </div>
    
    );
  }
  
  export default Home;