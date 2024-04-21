// import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useLocation} from 'react-router-dom';
// import all from './All';


function Footer() {

  return (


    <div className="bg-black lg:px-10 py-5 mt-4 flex lg:justify-between justify-center lg:flex-row flex-col flex-wrap text-gray-300 items-center">
          
          <ul className='flex flex-wrap justify-center'>
            <li><NavLink className={'text-gray-300 w-full hover:text-gray-200 px-2 font-medium'} to="/">Inicio</NavLink></li>
            <li><NavLink className={'text-gray-300 w-full hover:text-gray-200 px-2 font-medium'} to="/general">General</NavLink></li>
            <li><NavLink className={'text-gray-300 w-full hover:text-gray-200 px-2 font-medium'} to="/technology">Tegnologia</NavLink></li>
            <li><NavLink className={'text-gray-300 w-full hover:text-gray-200 px-2 font-medium'} to="/sport">Deporte</NavLink></li>
            <li><NavLink className={'text-gray-300 w-full hover:text-gray-200 px-2 font-medium'} to="/entertainment">Entretenimiento</NavLink></li>
          </ul>
     
          <p className='px-2 text-sm lg:mt-0 mt-3 text-center'>Copyright © 2024 Noticias Hoy S.R.L. | Designed by Deyvid</p>
    
    </div>
  );
  }
  
  export default Footer;