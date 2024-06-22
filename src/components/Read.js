import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useParams} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import List from './List_article';

import all from "./All";

function Read() {

    // build the article view
    let [readArticle, setReadArticle] = useState([])

    const { id } = useParams();

    const getReadArticle = () =>
    {
        fetch(`${all.link}/article/${id}`)
        .then(response => response.json())
        .then(data => {
    
            setReadArticle(data)
            getUserDates(data[0].publisher,`${data[0].day}/${data[0].month}/${data[0].year}`)

            // title of the page
            document.title = `${data[0].title} - Noticias Hoy`

        })
    }
    useEffect(getReadArticle, [])

    let [user, setUser] = useState([])
  
    const getUserDates = (publisher, date) =>
    {
        fetch(`${all.link}/user/${publisher}`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(data=> {
            let publisherProfile = [
                <div key={9} className='flex items-center mt-3'>
                    <img className='w-10 h-10 mr-3 border-2 border-blue-700 rounded-full' src={data[0].avatar} alt='perfil'/>
                    <div>
                        <h2>Publicado: {date}</h2>
                        <p>By: <span className='font-bold'>{data[0].user}</span></p>
                    </div>
                </div>
            ]

            setUser(publisherProfile)
        })
        .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
    }



    let url = window.location.href;

    let article = [] 
    for (let item of readArticle) 
    {
       
        article.push
        (
            <div className='mb-4' key={item.id_article}>

                <h2 className='text-4xl font-bold'>{item.title}</h2>
                <p className='mt-2'>{item.description}</p>
                {user}
                <img className='my-4 w-full' src={item.front_page}/>
                <div className='md:flex'>
                    <div className='md:mx-4 mb-2 flex md:block'>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className='' target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="md:w-7 w-6 md:my-3 mx-1 md:mx-0 text-zinc-800 hover:text-blue-700" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                        </a>

                        <a href={`https://twitter.com/intent/tweet?text=${item.title}&url=${url}`} target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='md:w-7 w-6 md:my-3 mx-1 md:mx-0 text-zinc-800 hover:text-zinc-500' viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                        </a>

                        <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='md:w-7 w-6 md:my-3 mx-1 md:mx-0 text-zinc-800 hover:text-emerald-400' viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                            </svg>
                        </a>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: item.body}}></div>
                </div>
            </div>
        )
            
    }
    return (

        <div>
            <Header/>
            <div className='lg:p-0 px-2 mx-auto mt-4 newCustomContainer'>
                {article}
                <List category = "/article" displayFirt = "true" labels = "notView" reload = "true" />
            </div>
            <Footer/>
        </div>
    
    );
  }
  
  export default Read;