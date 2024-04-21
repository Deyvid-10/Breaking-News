import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useParams} from 'react-router-dom';

import all from "./All";

function Firt(props) {

    // get de user data
    let getTokenUser = localStorage.getItem("tokenUser")
    let tokenUser = getTokenUser.split(",")

    const getUserDates = () =>
    {

        if(getTokenUser !== "")
        {
            fetch(`${all.link}/user/${tokenUser[1]}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenUser[0]}`
            }
            })
            .then(respuesta => respuesta.json())
            .then(data=> {
            let userPermit = [data[0].id_user, data[0].permit]
            localStorage.setItem("userPermit", userPermit)
                
            })
            .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
        }
    }

    useEffect(getUserDates, [])

    // redirect to read page

    let nav = useNavigate()
    const reRead = (id_article) =>
    {
        nav(`/read/${id_article}`)
    }  

    // build the article front page 
    let [firtArticles, setFirtArticles] = useState([])
    

    const getFirtArticles = () =>
    {
        fetch(`${all.link}${props.category}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              quantity: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            
            chargeArticle(data[0])
           
        })
        
    }

    useEffect(getFirtArticles, [])

    const chargeArticle = (item) =>
    {
         // get datetime
         let datetime = new Date()
         let currentTime = datetime.getTime()

         // get the difference of time
         let dif = currentTime - Number(item.time)
         let difMin = Math.floor(dif / (60 * 1000))
         let difHour = Math.floor(difMin / 60)
         let difDay = Math.floor(difHour / 24)

         // write de message to time
         let textTime = ""
         if(difMin === 0 || difMin === 1)
         {
             textTime = `hace un momento`
         }
         else
         {
             if(difHour === 0)
             {
                 textTime = `hace ${difMin} minutos`
             }
             else
             {
                 if(difHour === 1)
                 {
                     textTime = `hace 1 hora`
                 }
                 else
                 {
                     if(difDay === 0)
                     {
                         textTime = `hace ${difHour} horas`
                     }
                     else
                     {
                         if(difDay === 1)
                         {
                             textTime = `hace 1 dia`
                         }
                         else
                         {
                             if(difDay < 15)
                             {
                                 textTime = `hace ${difDay} dias`
                             }
                             else
                             {
                                 textTime = `publicado: ${firtArticles.day}/${firtArticles.month}/${firtArticles.year}`
                             }
                         }
                     }
                 }
             }
         }

         // build the firt article
         let article = []

         article.push
         (
            <div>
                <div onClick={()=>{reRead(item.id_article)}}  className='customSize md:mr-0 cursor-pointer overflow-hidden flex justify-center items-center relative'>
                    <img className='w-full h-full object-cover' src={require(`../img/articles/${item.front_page}`)}/>
                    <div className='absolute left-0 top-0 bgShadowFirt w-full h-full p-6 flex items-end'>
                        <div>
                            <div className='flex items-center'>
                                <p className='bg-blue-700 px-3 text-white font-bold mr-2 '>{item.category}</p>
                                <p className='text-white'>{textTime}</p>
                            </div>
                            <div className='hideLines hideTitle'>
                                <h2 className='text-3xl font-bold text-white'>{item.title}</h2>
                            </div>
                            <div className='hideLines'>
                                <p className='text-white'>{item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {deleteButtom(item.id_article, item.publisher)}
            </div>
            )

            setFirtArticles(article)
    }

    // delete article

    const deleteArticle = (articleId) =>
    {

        fetch(`${all.link}/deleteArticle/${articleId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser[0]}`
        }
        })
        .then(respuesta => respuesta.text())
        .then(data=> {
            all.notification("positive", data)
            setTimeout(() => {window.location.reload()}, 2200)
        })
        .catch(error => {throw new Error ("Error  en la solicitud: " + error)})       
    }

    // function to show delete alert

    const [showDelete, setShowDelete] = useState(true)
    const [articleId, setArticleId] = useState("")

    const handleShowDelete = (idArticle) =>
    {
        setShowDelete(!showDelete)
        setArticleId(idArticle)
    }
    
    // function to create the delete buttom

    let getUserPermit = localStorage.getItem("userPermit")
    let userPermit = getUserPermit.split(",")

    let deleteButtom = (articleId, publisher) =>
    {
        if(getTokenUser !== "" &&  (Number(userPermit[0]) === publisher || Number(userPermit[1]) === 1) )
        {
            let deleteButtom = [
                <div className='flex justify-center p-2'>
                    <button onClick={()=> {handleShowDelete(articleId)}} type="button" className="flex items-center mb-4 bg-red-600 text-white ml-2 px-2 py-1 rounded-md hover:bg-red-700 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                            </svg>
                        Eliminar
                    </button>
                </div>
            ]
            
            return deleteButtom
        }
    }


     
    return (
        
        <div className='mr-2 w-full'>
            {firtArticles}

            <div style={{ display: showDelete ? 'none' : 'flex'}} className='fixed left-0 top-0 w-full h-full justify-center items-center deleteShadow'>
                <div className='bg-white rounded-xl p-5 z-20'>
                    <div className='flex justify-end '>
                        <svg className='hover:cursor-pointer' onClick={handleShowDelete} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </div>
                    <div className='flex justify-center mb-6'><img  className="w-12" src={require('../img/icons/borrar.png')} /></div>
                    <h2 className='text-xl'>Estas seguro que quieres eliminar este articulos?</h2>
                    <div className='flex justify-end mt-5'>
                        <button className='text-black' onClick={handleShowDelete}>Cancelar</button>
                        <button className='ml-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md' onClick={() => {deleteArticle(articleId)}}>Confirmar</button>
                    </div>
                </div>
            </div>

            <div id="notification"></div>
        </div>
    
    );
  }
  
  export default Firt;