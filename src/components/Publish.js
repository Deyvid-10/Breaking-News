import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import all from './All';
import Header from './Header';
import Footer from './Footer';

function Publish() {

  // get the values at each part of the article
  const [title, setTitle] = useState('');

  const getTitle = (event) =>
  {
    setTitle(event.target.value)
  }

  const [frontPage, setFrontPage] = useState({});

  const getFrontPage = (event) =>
  {
    var formData = new FormData();
    formData.append('file', event.target.files[0]);
    
    setFrontPage(formData)
  }

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
  const save = () =>
  { 
    // get datetime
    let datetime = new Date()
    let currentTime = datetime.getTime()
    let currentDay = datetime.getDate()
    let currentMonth = datetime.getMonth() + 1
    let currentYear = datetime.getFullYear()

    let getTokenUser = localStorage.getItem("tokenUser")
    let tokenUser = getTokenUser.split(",")
    
    if(getTokenUser !== "")
    {   
      console.log(frontPage);
      
      if(title != "" && frontPage != "" && description != "" && text != "" && category != "")
      {
        console.log(frontPage);
        // upload img
        fetch(`${all.link}/uploadImg`, {
          method: 'POST',
          body: frontPage
        })
        .then(response => response.text())
        .then(data => {})
        .catch(error => {
          console.error('Error de red al subir el archivo:', error);
        });

        // publish article
        
        setTimeout(()=>{fetch(`${all.link}/publish`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser[0]}`
          },
          body: JSON.stringify({
            title: title,
            frontPage: frontPage,
            description: description,
            text: text,
            category: category,
            publisher: Number(tokenUser[1]),
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
      .catch(error => { throw new Error("Error en la solicitud: " + error) })}, 1500)
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

  }

  return (

    <div>
      <Header/>
      
      <div className='lg:w-10/12 lg:p-0 px-2 mx-auto'>
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
        <div className='flex justify-center mt-4'>
          <button type="button" className="flex items-center bg-green-600 hover:bg-green-500 text-white p-2 rounded-md font-bold" onClick={save}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
              <path d="M11 2H9v3h2z"></path>
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"></path>
            </svg>
            Publicar
          </button>
        </div>
        <div id="notification"></div>
      </div>
      <Footer/>
    </div>
  );
}

export default Publish;
