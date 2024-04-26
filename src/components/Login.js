import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate} from 'react-router-dom';
import all from "./All";

function Login() {

    // title of the page
    useEffect(()=>{
        document.title = "Login - Noticias Hoy"
      }, [])

    // get the inputs values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getEmail = (event) =>
    {
        setEmail(event.target.value)
    }

    const getPassword = (event) =>
    {
        setPassword(event.target.value)
    }
    
    // redirect to home page
    let nav = useNavigate()
    const reHome = () =>
    {
        nav("/")
    }

    // show logIN

    const [showLogIn, setShowLogIn] = useState(true)
    const [showSpinner, setShowSpinner] = useState(true)

    const showLog = () =>
    {
        let customContainer2 = document.getElementById('customContainer2');
        let logoLogin = document.getElementById('logoLogin');
        let logoLogin2 = document.getElementById('logoLogin2');
        let askHide = document.getElementById('askHide');
        let buttomHude = document.getElementById('buttomHude');
        let buttomHude2 = document.getElementById('buttomHude2');
        let socialMediaChange = document.getElementById('socialMediaChange');
        customContainer2.classList.add("customContainer2")
        logoLogin.classList.add("logoLogin")
        logoLogin2.classList.add("logoLogin2")
        askHide.classList.add("askHide")
        buttomHude.classList.add("buttomHude")
        buttomHude2.classList.add("buttomHude")
        socialMediaChange.classList.add("socialMediaChange")

        setTimeout(() => {
            setShowLogIn(!showLogIn)
          }, 600);
    }

    // login function
    const logIn = () => 
    {    
        setShowSpinner(false)
        try {
            fetch(`${all.link}/user/logIn`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.text())
            .then(data => {

                if(data === "")
                {
                    all.notification("negative", "Usuario o contrasena incorrecta")
                }
                else
                {
                    let json_data = JSON.parse(data)
                    localStorage.setItem("tokenUser", json_data) 
                    reHome()
                }
                setShowSpinner(true)
            })
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="h-screen bg-slate-500 bg-img">

            <img src="https://firebasestorage.googleapis.com/v0/b/prueba-36dc0.appspot.com/o/1714150786390%20662a948fe90f6.jpeg?alt=media&token=539ea6b8-0915-41fe-8138-1a449c352d0b" alt=""/>

            <div className='h-screen bg-img-black'>
                <div className="flex flex-col shadow-lg items-center customContainer" id='customContainer2'>
                
                    <Link to="/" className='text-4xl mt-28 logo' id="logoLogin">Noticias <span className='bg-blue-700 text-white py-0.5 px-2 rounded-lg' id='logoLogin2'>Hoy</span></Link>
                    <h4 className="text-black mt-28 text-xl" id='askHide'>Quieres ingresar como:</h4>
                    <div className='flex mt-5'>
                        <button type="button" onClick={showLog} className="flex items-center bg-gray-900 text-white text-lg mx-4 px-4 py-2 rounded-md hover:bg-gray-800 font-bold" id='buttomHude'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>
                                </svg>
                            Admin
                        </button>
                        <button  type="button" onClick={reHome} className="flex items-center bg-blue-700 text-white text-lg mx-4 px-4 py-2 rounded-md hover:bg-blue-600 font-bold" id='buttomHude2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"></path>
                            <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"></path>
                            </svg>
                            Usuario
                        </button>
                    </div>

                    <h4 style={{ display: showLogIn ? 'none' : 'flex'}} className="text-white mt-20 mb-2 text-2xl">Ingresa</h4>
                    
                    <div style={{ display: showLogIn ? 'none' : 'flex'}} className="flex-col align-items-center w-3/5 sm:w-80 mx-96">

                        <div className="flex items-center">
                            <svg className='text-center fill-white bg-gray-900 rounded-l w-10 h-10 px-2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
                            </svg>
                            <input type="text" className='rounded-e h-10 w-full my-2 px-2' onChange={getEmail} placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className='text-center fill-white bg-gray-900 rounded-l w-10 h-10 px-2' width="25" height="25" viewBox="0 0 16 16">
                            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                            <input type="password" onChange={getPassword} className='rounded-e h-10 w-full my-2 px-2' placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <button style={{ display: showLogIn ? 'none' : 'flex'}} type="button" className="flex items-center bg-gray-900 border-2 text-white text-lg m-4  px-2 py-1 rounded-md hover:bg-gray-800 font-bold" onClick={logIn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"></path>
                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"></path>
                            </svg>
                        Ingresa
                        </button>

                        <div id='spinner4' className={showSpinner ? "hidden":"block"} role="status">
                            <svg aria-hidden="true" className="w-5 h-5 text-center text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
                
                    <div className="flex justify-around w-52 mb-6 mt-auto text-blue-800" id='socialMediaChange'>
                        <a href="https://www.youtube.com/" className=" hover:text-black" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7" viewBox="0 0 16 16">
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/" className="hover:text-black" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/" className="hover:text-black" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div id="notification"></div>
        
        </div>
    );
  }
  
  export default Login;