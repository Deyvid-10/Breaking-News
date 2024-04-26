import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useParams} from 'react-router-dom';

import firebase from './firebase-config';
import all from "./All";

function Firt(props) {

    // get de user data
    let getTokenUser = localStorage.getItem("tokenUser")
    if(getTokenUser == null)
    {
      getTokenUser = localStorage.setItem("tokenUser", "")
    }
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
            
            let spinner = document.getElementById("spinner")
            spinner.style.display = "none"
           
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
            <div key={1}>
                <Link to={`/read/${item.id_article}`}  className='customSize md:mr-0 cursor-pointer overflow-hidden flex justify-center items-center relative'>

                    {/* <img className='w-full h-full object-cover' src={item.front_page}/> */}
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
                </Link>

                {deleteButtom(item.id_article, item.publisher, item.front_page)}
            </div>
            )

            setFirtArticles(article)
    }

    // delete article

    const deleteArticle = (articleId, Img) =>
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
            deleteImg(Img)
            all.notification("positive", data)
            setTimeout(() => {window.location.reload()}, 2200)
        })
        .catch(error => {throw new Error ("Error  en la solicitud: " + error)})       
    }

    // delete img
    const deleteImg = (urlIMG)=>
    {
        const storageImg = firebase.storage().refFromURL(urlIMG)
        storageImg.delete()
        .then(()=>{console.log("Imagen eliminada correctamente");})
        .catch((error)=>{console.error("Error al eliminar imagen", error);})
    }

    // function to show delete alert

    const [showDelete, setShowDelete] = useState(true)
    const [articleId, setArticleId] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const handleShowDelete = (idArticle, urlImg) =>
    {
        setShowDelete(!showDelete)
        setArticleId(idArticle)
        setImgUrl(urlImg)
    }
    
    // function to create the delete buttom

    let getUserPermit = localStorage.getItem("userPermit")
    if(getUserPermit == null)
    {
        getUserPermit = localStorage.setItem("userPermit", "")
    }
    let userPermit = getUserPermit.split(",")

    let deleteButtom = (articleId, publisher, urlImg) =>
    {
        if(getTokenUser !== "" &&  (Number(userPermit[0]) === publisher || Number(userPermit[1]) === 1) )
        {
            let deleteButtom = [
                <div key={2} className='flex justify-center p-2'>
                    <button onClick={()=> {handleShowDelete(articleId, urlImg)}} type="button" className="flex items-center mb-4 bg-red-600 text-white ml-2 px-2 py-1 rounded-md hover:bg-red-700 font-bold">
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
        
        <div className='mr-2 w-full relative'>
            <div id='spinner' className='flex justify-center items-center my-40 mx-auto' role="status">
                <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
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
                        <button className='ml-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md' onClick={() => {deleteArticle(articleId, imgUrl)}}>Confirmar</button>
                    </div>
                </div>
            </div>

            <div id="notification"></div>
        </div>
    
    );
  }
  
  export default Firt;