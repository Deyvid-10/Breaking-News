import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import all from './All';
import Header from './Header';
import Footer from './Footer';
import firebase from './firebase-config';

function Publish() {

  // title of the page
  useEffect(()=>{
    document.title = "Publicar - Noticias Hoy"
  }, [])

  // get the values at each part of the article
  const [title, setTitle] = useState('');

  const getTitle = (event) =>
  {
    setTitle(event.target.value)
  }

  // upload IMG

  const [frontPage, setFrontPage] = useState(null);

  const getFrontPage = (event) => 
  {
    setFrontPage(event.target.files[0]);
  };

  const [showSppiner, setShowSpinner] = useState(true);

  const handleUploadImg = () => {
    
    let getTokenUser = localStorage.getItem("tokenUser")
    let tokenUser = getTokenUser.split(",")

    if(getTokenUser !== "")
    {   
      if(title !== "" && frontPage && description !== "" && text !== "" && category !== "")
      {
        setShowSpinner(!showSppiner)

        let aditionalName = new Date().getTime()

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(aditionalName + " " + frontPage.name);

        fileRef.put(frontPage).then(() => {
          console.log("Archivo subido correctamente");
          fileRef.getDownloadURL().then((urlIMG) => {

            save(`${urlIMG}`, tokenUser)
            setShowSpinner(!showSppiner)
          });
        });   
      }
      else
      {
        all.notification("negative", "Tienes que llenar todos los campos")
      }
    }
    else
    {
      all.notification("negative", "No estas logeado, por favor ingresa")
    }
    
  };

  const [description, setDescription] = useState('');

  const getDescription = (event) =>
  {
    setDescription(event.target.value)
  }

  // manage values of the text editor
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const [category, setCategory] = useState('');

  const getCategory = (event) =>
  {
    setCategory(event.target.value)
  }

  // boton function to save
  const save = (frontPageImg, getTokenUser) =>
  { 
    // get datetime
    let datetime = new Date()
    let currentTime = datetime.getTime()
    let currentDay = datetime.getDate()
    let currentMonth = datetime.getMonth() + 1
    let currentYear = datetime.getFullYear()
    
    // publish article
    
    setTimeout(()=>
    {
      fetch(`${all.link}/publish`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getTokenUser[0]}`
      },
      body: JSON.stringify({
        title: title,
        front_page: frontPageImg,
        description: description,
        text: text,
        category: category,
        publisher: Number(getTokenUser[1]),
        time: currentTime,
        day: currentDay,
        month: currentMonth,
        year: currentYear
      })
      })
      .then(respuesta => respuesta.text())
      .then(data => {

        if(data !== "")
        {
          all.notification("positive", "Articulo publicado exitosamente")
          setTimeout(()=>{window.location.reload()}, 2200)
        }
          
      })
      .catch(error => { throw new Error("Error en la solicitud: " + error) })
    }, 500)

  }

  return (

    <div>
      <Header/>
      
      <div className='lg:p-0 px-2 mx-auto mt-4 newCustomContainer'>
        <h2 className='flex justify-center p-1 my-2 text-3xl font-bold border-blue-700 bg-blue-100 border-l-8'>Publica un articulo</h2>
      
        <input className="w-full border-gray-300 border-2 p-2 placeholder:text-black rounded-md" value={title} onChange={getTitle} id="floatingPassword" placeholder="Titulo"></input>

        <input type='file' onChange={getFrontPage} className="my-2"></input>

        <textarea className="h-16 w-full border-gray-300 border-2 p-2 placeholder:text-black rounded-md" value={description} onChange={getDescription} placeholder="Descripcion" id="floatingTextarea2"></textarea>
  
        <ReactQuill value={text} onChange={handleChange} className='h-52'/>
       
        <select value={category} onChange={getCategory} className="form-select border-gray-300 border-2 mt-12 text-lg" aria-label="Default select example">
          <option value="">Selecciona la categoria</option>
          <option value="General">General</option>
          <option value="Tegnologia">Tegnologia</option>
          <option value="Deporte">Deporte</option>
          <option value="Entretenimiento">Entretenimiento</option>
        </select>
        <div className='flex justify-center items-center mt-4'>
          <button type="button" className="flex items-center bg-green-600 hover:bg-green-500 text-white p-2 rounded-md font-bold" onClick={handleUploadImg}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
              <path d="M11 2H9v3h2z"></path>
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"></path>
            </svg>
            Publicar
          </button>

          <div id='spinner4' className={showSppiner ? 'hidden': 'block ml-4'} role="status">
            <svg aria-hidden="true" className="w-6 h-6 text-center text-gray-200 animate-spin dark:text-gray-600 fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        </div>
      
        <div id="notification"></div>
      </div>
      <Footer/>
    </div>
  );
}

export default Publish;
