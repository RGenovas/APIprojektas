import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios';
import Header from '../components/Header';
import square from '../assets/square.png'
import './AddEntry.css'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:3000/testroute" //naudotas route

const AddEntry = () => {
    const bandRef = useRef()
    const titleRef = useRef()
    const genreRef = useRef()
    const yearRef = useRef()
    const remasterRef = useRef()
    const serialRef = useRef()
    const formatRef = useRef()
    const navigate = useNavigate();

      const [postTitle, setPostTitle] = useState({band:""},{title: ""},{genre:""},{img:""},{year:""},{remaster:""},{serial:""},{format:""})
      const [uploadImg, setUploadImg] = useState( { myFile : ""})
  
    
      const createPost = async (newTitle) => {
        try{
        
          await axios.post(url, newTitle)
          console.log('bando ikelt',newTitle)
          alert('Record succesfully added!')
          console.log("returning"); 
          navigate('/');
        }catch(error){
          console.log(error)
        }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let image = uploadImg.myFile.valueOf()
        postTitle.img = image
          
        createPost(postTitle)
       
       }
    
       const handleInputChange =  (e) => {
        e.preventDefault()
        
        let laikinasBand = bandRef.current.value
        let laikinasTitle = titleRef.current.value
        let laikinasGenre = genreRef.current.value
        let laikinasYear = yearRef.current.value 
        let laikinasRemaster = remasterRef.current.value
        let laikinasSerial = serialRef.current.value 
        let laikinasFormat = formatRef.current.value
        
        setPostTitle({...postTitle, band:laikinasBand, title: laikinasTitle, genre:laikinasGenre, year:laikinasYear,remaster:laikinasRemaster,serial:laikinasSerial,format:laikinasFormat})
       }
    
       const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log(base64) perziurejimas ar susigeneravo string konsoleje
        // cia tiesa prasideda idomybes .png yra aprasytas bet juos kelt atsisako. 200/200 rezoliucijos JPG/JPEG panesa.
        // klaida ant PNG 300x300 "request entity too large"
        setUploadImg({ ...uploadImg, myFile : base64 })
      }
    
   
       
  return (
    <div>
    <Header/>
    <div className="add-wrapper">
        
    <form onSubmit={handleSubmit} className='add-form'>
    <img src={uploadImg.myFile || square} alt="pavIkelimui" />
      <input 
        type="file" 
        name="myFile"
        className='upload-image'
        id='file-upload'
        accept='.jpeg, .png, .jpg' //PNG yra bet nepaima
        onChange={handleFileUpload}
       />
      <h2>Submit information:</h2>
      <label>Band name</label>
      <input ref={bandRef} type="text"  className="name-input"placeholder='Band name' onChange={(e) => handleInputChange(e)} required/> 
      <label>Album title</label>
      <input ref={titleRef} type="text" placeholder='Album title' onChange={(e) => handleInputChange(e)} required/>
      <label>Genre description</label>
      <input ref={genreRef} type="text" placeholder='Genre description' onChange={(e) => handleInputChange(e)} required/>
      <label>Release year</label>
      <input ref={yearRef} type="number" placeholder='Original release year' onChange={(e) => handleInputChange(e)} required/>
      <label>Remasterer/Bootleg/Original</label>
      <input ref={remasterRef} type="text" placeholder='Remastered?' onChange={(e) => handleInputChange(e)} required/>
      <label>Release serial number</label>
      <input ref={serialRef} type="text" placeholder='Release serial number' onChange={(e) => handleInputChange(e)} required/>
      <label>Release format (Vinyl,CD,Digipack,LP,EP etc.)</label>
      <input ref={formatRef} type="text" placeholder='Release format' onChange={(e) => handleInputChange(e)} required/>
       <button type='submit'>Submit</button>
     
   
    
       
    </form>
    </div>
    <Footer/>
  </div>
  )
}

export default AddEntry


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}