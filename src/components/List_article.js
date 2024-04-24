import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate} from 'react-router-dom';

import all from "./All";

function List(props) {
  
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
    // let [articlesItems, setArticlesItems] = useState([])

    let view 

    if(props.category === "/search")
    {
        view = `${props.category}/${props.search}`
    }
    else
    {
        view = props.category
    }

    let [quantity, setQuantity] = useState(10)

    const getArticlesItems = () =>
    {
        setQuantity(quantity + 10)

        let spinner3 = document.getElementById("spinner3")
        spinner3.style.display = "flex"

        fetch(all.link+view, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity
          })
      })
        .then(response => response.json())
        .then(data => {
            
            // setArticlesItems(data)
            buildArticle(data)
            let spinner2 = document.getElementById("spinner2")
            spinner2.style.display = "none"

            let spinner3 = document.getElementById("spinner3")
            spinner3.style.display = "none"
        })
    }

    useEffect(getArticlesItems, [])

    // redirect to read page
    let nav = useNavigate()
    const reRead = (articleId) =>
    {
        nav(`/read/${articleId}`)
        
        if(props.reload === "true")
        {
            window.location.reload()
        }
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
    if(getUserPermit == null)
    {
        getUserPermit = localStorage.setItem("userPermit", "")
    }
    let userPermit = getUserPermit.split(",")

    let deleteButtom = (articleId, publisher) =>
    {
        if(getTokenUser !== "" &&  (Number(userPermit[0]) === publisher || Number(userPermit[1]) === 1) )
        {
            let deleteButtom = [
                
                <div className='flex justify-center'>
                    <button onClick={() => {handleShowDelete(articleId)}} type="button" className="flex items-center mb-4 bg-red-600 text-white ml-2 px-2 py-1 rounded-md hover:bg-red-700 font-bold">
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


    const [articleList, setArticleList] = useState([])
  
    const buildArticle = (Items) =>
    {

        // get datetime
        let datetime = new Date()
        let currentTime = datetime.getTime()

        let textTime = ""
        let article = []
        let articleCount = 0 

        for (let item of Items) 
        {
            // get the difference of time
            let dif = currentTime - Number(item.time)
            let difMin = Math.floor(dif / (60 * 1000))
            let difHour = Math.floor(difMin / 60)
            let difDay = Math.floor(difHour / 24)

            // write de message to time
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
                                    textTime = `publicado: ${item.day}/${item.month}/${item.year}`
                                }
                            }
                        }
                    }
                }
            }
            
            // build the article
            if(articleCount === 1 || props.displayFirt === "true")
            {                             
                article.push
                (
                    <div key={item.id_article} className=''>
                        <div onClick={() => reRead(item.id_article)} className='md:flex  w-full hover:cursor-pointer mb-2 hover:text-gray-700'>
                            <div className='md:w-96 w-full h-48 overflow-hidden relative'>
                                <img className='w-full h-full object-cover' src={require(`../img/articles/${item.front_page}`)}/>
                                
                                <div className='absolute left-0 top-0 bgShadowArticle h-full w-full'></div>
                            </div>
                            <div className='p-4 customBorder w-full'>
                            
                                <div className='flex items-center'>
                                    <p className='bg-blue-700 px-3 text-white font-bold mr-2 '>{item.category}</p>
                                    <p>{textTime}</p>
                                </div>
                                <div className='hideLines hideTitle'>
                                    <h2 className='text-2xl font-bold'>{item.title}</h2>
                                </div>
                                <div className='hideLines hideLines2'>
                                    <p>{item.description}</p>
                                </div>
                            
                            </div>
                        </div>
                        
                    {deleteButtom(item.id_article, item.publisher)}
                    </div>
                )
        }
        else
        {
            articleCount = 1
        }
            
        }

        // message for article not find
        if(Items.length === 0)
        {
            article.push
            (
                <h1 className='flex justify-center mt-10 text-xl'>No se encontraron articulos con ese nombre</h1> 
            )
        }

        setArticleList(article)
    }

    // weather label

    const getCoords = () =>
    {
        if("geolocation" in navigator)
        {
            navigator.geolocation.getCurrentPosition(function(position){
                     
                localStorage.setItem("lat", position.coords.latitude)
                localStorage.setItem("lon", position.coords.longitude)
            })
        }  
    }
    useEffect(()=>{getCoords()}, [])

    let [iconWeather, setIconWeather] = useState("")
    let [temp, setTemp] = useState("")
    let [description, setDescription] = useState("")
    let [location, setLocation] = useState("")
    let [humidity, setHumidity] = useState("")
    let [wind, setWind] = useState("")
    let [pressure, setPressure] = useState("")
    
    const getDataWeather = () =>
    {
        let lat = localStorage.getItem("lat")
        let lon = localStorage.getItem("lon")
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=imperial&APPID=2340a05b137f94b341e745c2bf07ae48`)
        .then(response => response.json())
        .then(data => {
    
            setIconWeather(data.weather[0].icon)
            setTemp(Math.round(data.main.temp))
            setDescription(data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1).toLowerCase())
            setLocation(data.name)
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setPressure(data.main.pressure)
        })

    }


    useEffect(()=>{getDataWeather()}, [])

    // foreign exchange label
    useEffect(()=>{foreignExchange()}, [])

    const [pesoDollar, setPesoDollar] = useState(1)
    const [dollarPeso, setDollarPeso] = useState(0)
    const [dollarPrice, setDollarPrice] = useState(0)

    const handleDollarPeso = (event) =>
    {
        setPesoDollar(event.target.value)
        setDollarPeso((event.target.value / dollarPrice).toFixed(3))
    }

    const handlePesoDollar = (event) =>
    {
        setDollarPeso(event.target.value)
        setPesoDollar((event.target.value * dollarPrice).toFixed(3))
    }

    const [pesoEuro, setPesoEuro] = useState(1)
    const [euroPeso, setEuroPeso] = useState(0)
    const [euroPrice, setEuroPrice] = useState(0)

    const handleEuroPeso = (event) =>
    {
        setPesoEuro(event.target.value)
        setEuroPeso((event.target.value / euroPrice).toFixed(3))
    }

    const handlePesoEuro = (event) =>
    {
        setEuroPeso(event.target.value)
        setPesoEuro((event.target.value * euroPrice).toFixed(3))
    }

    const [pesoSterling, setPesoSterling] = useState(1)
    const [esterlingPeso, setSterlingPeso] = useState(0)
    const [esterlingPrice, setEsterlingPrice] = useState(0)

    const handleSterlingPeso = (event) =>
    {
        setPesoSterling(event.target.value)
        setSterlingPeso((event.target.value / esterlingPrice).toFixed(3))
    }

    const handlePesoSterling = (event) =>
    {
        setSterlingPeso(event.target.value)
        setPesoSterling((event.target.value * esterlingPrice).toFixed(3))
    }

    const [monthDolar, setMonthDolar] = useState([])
    const [monthEuro, setMonthEuro] = useState([])
    const [monthSterling, setMonthSterling] = useState([])

    const foreignExchange = () =>
    {
        let date = new Date()
        let month = date.getMonth()
        let year = date.getFullYear()

        let arrayMonthDolar = []
        let arrayMonthEuro = []
        let arrayMonthSterling = []
        let dateRates = ``

        for(let i = 4; i>=0; i--)
        {
            if(i === 0)
            {
                fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=d74d23cfde00cb2f8d28d8931679dec98b60991b&format=json&from=DOP`)
                .then(response => response.json())
                .then(data => {
            
                    setDollarPeso((1 / data.rates.USD.rate).toFixed(3))
                    setEuroPeso((1 / data.rates.EUR.rate).toFixed(3))
                    setSterlingPeso((1 / data.rates.GBP.rate).toFixed(3))
        
                    setDollarPrice(data.rates.USD.rate)
                    setEuroPrice(data.rates.EUR.rate)
                    setEsterlingPrice((data.rates.GBP.rate))
                })
            }
            else
            {

                if((month - i) >= 0)
                {
                    dateRates = `${year}-${(month + 1) - i}-25`
                }
                else
                {
                    dateRates = `${year - 1}-${(month + 13) - i}-25`
                }

                fetch(`https://api.getgeoapi.com/v2/currency/historical/${dateRates}?api_key=d74d23cfde00cb2f8d28d8931679dec98b60991b&format=json&from=DOP`)
                .then(response => response.json())
                .then(data => {
            
                    arrayMonthDolar.push((1 / data.rates.USD.rate).toFixed(3))
                    arrayMonthEuro.push((1 / data.rates.EUR.rate).toFixed(3))
                    arrayMonthSterling.push((1 / data.rates.GBP.rate).toFixed(3))
                    
                })
            }
        }

        setMonthDolar(arrayMonthDolar);
        setMonthEuro(arrayMonthEuro);
        setMonthSterling(arrayMonthSterling);
    }

    let labels = []

    if(props.labels !== "notView")
    {
        labels.push(
            <div>
                <div className='xl:w-96 xl:pl-2'>
                
                <h1 className='text-2xl p-1 my-2 w-full text-center font-bold border-blue-700 bg-blue-100 border-l-8'>Clima</h1>

                <div className='bg-blue-200 p-2 flex xl:flex-col justify-center xl:items-stretch items-center flex-wrap'>
                    <div>
                        <div className='flex items-center justify-center'>
                            <img src={`https://openweathermap.org/img/wn/${iconWeather}@2x.png`} alt=""/>
                            <p className='flex'><span className='text-4xl font-bold '>{temp}</span>°F</p>
                        </div>
                        <p className='text-xl text-center font-bold'>{description}</p>
                        <br/>  
                    </div>
                        
                    <div className='xl:ml-0 ml-4'>
                        <p>Ubicacion: {location}</p>
                        <p>Humedad: {humidity}%</p>
                        <p>Viento: a {wind} mph</p>
                        <p>Presion: {pressure}</p>
                    </div>
                    
                </div>

                <h1 className='text-2xl p-1 my-2 w-full text-center font-bold border-blue-700 bg-blue-100 border-l-8'>Divisas</h1>

                <div className='bg-emerald-200 p-2'>
                    <div className='flex justify-center'><img className='md:w-36 w-28' src={require('../img/icons/dolar.png')}/></div>
                    <h2 className='text-xl text-center font-bold'>Dólar estadounidense</h2>
                    <h2 className='text-xl text-center'>1 USD = {(1 / dollarPrice).toFixed(3)} DOP</h2>
                    <div className='my-4'>
                        <label className='font-bold ml-2' htmlFor="USD">USD</label>
                        <input type="number" value={pesoDollar} onChange={handleDollarPeso} id='USD' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        <label className='font-bold ml-2' htmlFor="DOP">DOP</label>
                        <input type="number" value={dollarPeso} onChange={handlePesoDollar} id='DOP' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        
                    </div>

                    {all.graphic("Dólar",monthDolar[0], monthDolar[1], monthDolar[2], monthDolar[3], (1 / dollarPrice).toFixed(3))}
                </div>

                <div className='bg-yellow-200 p-2 mt-2'>
                    <div className='flex justify-center'><img className='md:w-36 w-28' src={require('../img/icons/euro.png')}/></div>
                    <h2 className='text-xl text-center font-bold'>Euro</h2>
                    <h2 className='text-xl text-center'>1 EUR = {(1 / euroPrice).toFixed(3)} DOP</h2>
                    <div className='my-4'>
                        <label className='font-bold ml-2' htmlFor="EUR">EUR</label>
                        <input type="number" value={pesoEuro} onChange={handleEuroPeso} id='EUR' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        <label className='font-bold ml-2' htmlFor="DOP">DOP</label>
                        <input type="number" value={euroPeso} onChange={handlePesoEuro} id='DOP' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        
                    </div>

                    {all.graphic("Euro", monthEuro[0], monthEuro[1], monthEuro[2], monthEuro[3], (1 / euroPrice).toFixed(3))}
                </div>

                <div className='bg-orange-200 p-2 mt-2'>
                    <div className='flex justify-center'><img className='md:w-36 w-28' src={require('../img/icons/libra-esterlina.png')}/></div>
                    <h2 className='text-xl text-center font-bold'>Libra esterlina</h2>
                    <h2 className='text-xl text-center'>1 GBP = {(1 / esterlingPrice).toFixed(3)} DOP</h2>
                    <div className='my-4 '>
                        <label className='font-bold ml-2' htmlFor="GBP">GBP</label>
                        <input type="number" value={pesoSterling} onChange={handleSterlingPeso} id='GBP' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        <label className='font-bold ml-2' htmlFor="DOP">DOP</label>
                        <input type="number" value={esterlingPeso} onChange={handlePesoSterling} id='DOP' className='block rounded-md w-full h-8 border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
                        
                    </div>

                    {all.graphic("Libra esterlina", monthSterling[0], monthSterling[1], monthSterling[2], monthSterling[3], (1 / esterlingPrice).toFixed(3))}
                </div>
            </div>
            </div>
        )
    }

    return (
        
        <div className='xl:flex' >
            <div className='w-full'>

                <h1 className='text-2xl p-1 my-2 w-full text-center font-bold border-blue-700 bg-blue-100 border-l-8'>Noticias</h1>
                
                <div id='spinner2' className='flex justify-center items-center my-40 mx-auto' role="status">
                    <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

                {articleList}
                <div className='flex justify-center'>
                    <button onClick={()=>{getArticlesItems();}} className="bg-black hover:bg-gray-900 text-white text-lg py-2 md:px-28 px-16 my-4">Mas publicaciones</button>
                </div>

                <div id='spinner3' className='flex justify-center mx-auto' role="status">
                    <svg aria-hidden="true" class="w-7 h-7 text-center text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                <div style={{ display: showDelete ? 'none' : 'flex'}} className='fixed left-0 top-0 w-full h-full justify-center items-center deleteShadow'>
                    <div className='bg-white rounded-xl p-5'>
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
            </div>

            {labels}

            <div id="notification"></div>
        </div>
    
    );
  }
  
  export default List;