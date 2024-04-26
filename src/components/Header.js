import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate, useLocation} from 'react-router-dom';
import all from './All';


function Header() {

  // style of button by location page
  const location = useLocation()
  const isActive = (pathName) => location.pathname === pathName

  // function to menu button
  
  let [menu, setMenu] = useState(true)

  const handleMenu = () =>
  {
    setMenu(!menu)
  }
  
  // get de user data
  let getTokenUser = localStorage.getItem("tokenUser")
  if(getTokenUser == null)
  {
    getTokenUser = localStorage.setItem("tokenUser", "")
  }
  let tokenUser = getTokenUser.split(",")
  

  let [userName, setUserName] = useState("")
  let [userAvatar, setUserAvatar] = useState("")

  const getUserDates = () =>
  {
    if(getTokenUser !== "")
    {
      fetch(`${all.link}/user/${tokenUser[1]}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(respuesta => respuesta.json())
      .then(data=> {
        setUserName(data[0].user)
        setUserAvatar(data[0].avatar)
      })
      .catch(error => {throw new Error ("Error  en la solicitud: " + error)})
    }
  }

  useEffect(getUserDates, [])

  // control the display user bar
  const [showUserBar, setShowUserBar] = useState(true);

  const handleShowUserBar = () => 
  {
    if(getTokenUser !== "")
    {
      setShowUserBar(false);
    }
    else
    {
      setShowUserBar(true)
    }
  };

  useEffect(handleShowUserBar, [])

  // get the input search value from header

  const [searchValue, setSearchValue] = useState("")

  const getSearchValue = (event) =>
  {
    setSearchValue(event.target.value)
  }

  // redirect to search page
  let search = useNavigate()
  const reSearch = () =>
  {
    search(`/search/${searchValue}`)
    window.location.reload()
  }

  // validate the expiration of the token
  const validateTokenExpiration = () =>
  {
    if(getTokenUser !== "")
    {
      fetch(`${all.link}/tokenExpiration`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: tokenUser[0]
        })
      })
      .then(response => response.text())
      .then(data => {

        if(data != "active")
        {
          all.notification("negative", "Tu sesion expiro, ingresa de nuevo")
          setTimeout(logout(), 2500)  
        }
          
      })
      .catch(error => { throw new Error("Error en la solicitud: " + error) })
    }
  }

  useEffect(validateTokenExpiration, [])

  // user logout 
  const logout = () =>
  {
    localStorage.setItem("tokenUser", "")
    window.location.reload()
  }

  const [showLogout, setShowLogout] = useState(true)  

  const handelShowLogout = () =>
  {
    setShowLogout(!showLogout)
  }

  return (

    <div>

      <nav className='flex px-4 shadow-md bg-white justify-between flex-col lg:flex-row'>

        <div className='flex items-center justify-between lg:justify-normal'>
          <NavLink  to="/" className='text-3xl py-3 logo mr-6'>Noticias <span className='bg-blue-700 text-white py-0.5 px-2 rounded-lg'>Hoy</span></NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleMenu} width="32" fill="currentColor" className='hover:text-blue-700 hover:cursor-pointer lg:hidden' viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </div>  
          
          <ul className={ menu ? 'hidden lg:flex flex-col lg:flex-row mr-0 lg:mr-auto' : 'flex flex-col lg:flex-row mr-0 lg:mr-auto'}>
            <li className='flex items-center'><NavLink className={isActive('/') ? 'border-blue-700 bg-blue-100 lg:bg-white w-full border-l-4 lg:border-l-0 lg:hover:border-l-0 lg:hover:border-b-4 lg:border-b-4 text-black px-2 py-2 lg:py-4 text-md font-medium' : 'text-gray-500 hover:bg-blue-100 lg:hover:bg-white w-full border-white border-l-4 lg:border-l-0 lg:hover:border-l-0 hover:border-l-4 hover:border-blue-600 lg:border-b-4 hover:text-black px-2 py-2 lg:py-4 text-md font-medium'} to="/">Inicio</NavLink></li>
            <li className='flex items-center'><NavLink className={isActive('/general') ? 'border-blue-700 bg-blue-100 lg:bg-white w-full border-l-4 lg:border-l-0 lg:hover:border-l-0 lg:hover:border-b-4 lg:border-b-4 text-black px-2 py-2 lg:py-4 text-md font-medium' : 'text-gray-500 hover:bg-blue-100 lg:hover:bg-white w-full border-white border-l-4 lg:border-l-0 lg:hover:border-l-0 hover:border-l-4 hover:border-blue-600 lg:border-b-4 hover:text-black px-2 py-2 lg:py-4 text-md font-medium'} to="/general">General</NavLink></li>
            <li className='flex items-center'><NavLink className={isActive('/technology') ? 'border-blue-700 bg-blue-100 lg:bg-white w-full border-l-4 lg:border-l-0 lg:hover:border-l-0 lg:hover:border-b-4 lg:border-b-4 text-black px-2 py-2 lg:py-4 text-md font-medium' : 'text-gray-500 hover:bg-blue-100 lg:hover:bg-white w-full border-white border-l-4 lg:border-l-0 lg:hover:border-l-0 hover:border-l-4 hover:border-blue-600 lg:border-b-4 hover:text-black px-2 py-2 lg:py-4 text-md font-medium'} to="/technology">Tegnologia</NavLink></li>
            <li className='flex items-center'><NavLink className={isActive('/sport') ? 'border-blue-700 bg-blue-100 lg:bg-white w-full border-l-4 lg:border-l-0 lg:hover:border-l-0 lg:hover:border-b-4 lg:border-b-4 text-black px-2 py-2 lg:py-4 text-md font-medium' : 'text-gray-500 hover:bg-blue-100 lg:hover:bg-white w-full border-white border-l-4 lg:border-l-0 lg:hover:border-l-0 hover:border-l-4 hover:border-blue-600 lg:border-b-4 hover:text-black px-2 py-2 lg:py-4 text-md font-medium'} to="/sport">Deporte</NavLink></li>
            <li className='flex items-center'><NavLink className={isActive('/entertainment') ? 'border-blue-700 bg-blue-100 lg:bg-white w-full border-l-4 lg:border-l-0 lg:hover:border-l-0 lg:hover:border-b-4 lg:border-b-4 text-black px-2 py-2 lg:py-4 text-md font-medium' : 'text-gray-500 hover:bg-blue-100 lg:hover:bg-white w-full border-white border-l-4 lg:border-l-0 lg:hover:border-l-0 hover:border-l-4 hover:border-blue-600 lg:border-b-4 hover:text-black px-2 py-2 lg:py-4 text-md font-medium'} to="/entertainment">Entretenimiento</NavLink></li>
          </ul>
          
          <div className={menu ? "hidden lg:flex py-3" : " flex py-3"}>
            <input type="text" onChange={getSearchValue} placeholder='Buscar...' className='block rounded-md w-full border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'/>
            <button onClick={reSearch} className='flex items-center bg-blue-700 text-white ml-2 px-2 py-1 rounded-md hover:bg-blue-600 font-bold'>
          
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" strokeWidth={0.5} stroke='white' className="mr-1" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            Buscar
            </button>
          </div>
      </nav>

      <div className={showUserBar ? 'hidden' : 'flex sm:flex-row flex-col px-8 shadow-md bg-white justify-between py-2'}>

        <div className='sm:flex items-end hidden'>
          <p className='text-xl mr-2 mb-2 text-white'>{userName}</p>
          <div className='w-10 bg-white rounded-full'> </div>
        </div>

        <Link to="/publish" className='flex items-center w-24 ml-auto mb-2 bg-blue-700 text-white sm:mb-0 sm:ml-2 px-2 py-1 rounded-md hover:bg-blue-600 font-bold'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" strokeWidth={0.5} stroke='white' className="mr-1" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          Publicar
        </Link>

        <div className='flex flex-col items-end'>
          <div className='flex items-end hover:cursor-pointer' onClick={handelShowLogout}>
            <p className='text-xl mr-2 mb-2 font-bold'>{userName}</p>
            {userAvatar && <img src={userAvatar} alt="avatar" className='w-10 border-2 border-blue-700 rounded-full'/>}
          </div>

     

          <div style={{ display: showLogout ? 'none' : 'flex'}}>
            <p className='hover:cursor-pointer hover:text-gray-600' onClick={logout}>Cerrar sesion</p>
          </div>
        </div>
      </div>
      
      <div id="notification"></div>
    </div>

  );
  }
  
  export default Header;