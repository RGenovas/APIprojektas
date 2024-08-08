import { useEffect, useRef, useState } from "react"
import Header from "../components/Header"
import { useParams, useNavigate, Link } from "react-router-dom"
import square from '../assets/square.png'
import axios from 'axios';
import './EntryDetails.css'
const EntryDetails = () => {
    const {id} = useParams()
    const [entry, setEntry] = useState ([])
    const [show,setShow] = useState(false) //editinimo slepimui
    const [editData, setEditData] = useState({title:""}, {band:""})
    const navigate = useNavigate();
    const bandRef = useRef()
    const titleRef = useRef()
    const genreRef = useRef()
    const yearRef = useRef()
    const remasterRef = useRef()
    const serialRef = useRef()
    const formatRef = useRef()
  

    useEffect(() => {
    const getEntries = async () => {
          try {
            //  const response = await axios.get(`http://localhost:3000/testroute/66b34f18a6013669d87a8856`) patikrinta su egzistavusio iraso ID 
            const response = await axios.get(
              `http://localhost:3000/testroute/${id}`
            )
          
            setEntry(response.data)
           
          } catch(error) {
            console.error('Error Fetching Entry', error)
          }
            }
            getEntries() },[entry])

            // kad nesikabunciau prie sito delete :(
    const handleDelete = async (e) =>{
      e.preventDefault(e)
        try{
          //     await axios.delete(`http://localhost:3000/testroute/66b34f18a6013669d87a8856`) tikrinimas iraso trinimo su egizstavusiu
            await axios.delete(`http://localhost:3000/testroute/${id}`)
              console.log('bando pasalinti',id)
              alert('Record succesfully deleted!')
            }catch(error){
              console.log(error)
            }
            
            console.log("returning"); 
            navigate('/');
          }      

   const handleEdit = (e) => {
  setShow(true)
}

const handleUpdate = async (e) => {
  e.preventDefault()
  console.log('cia paprasta', editData)
  try{
    await axios.patch(`http://localhost:3000/testroute/${id}`,editData)
      console.log('bando atnaujinti',id)
      alert('Record succesfully updated!')
    }catch(error){
      console.log(error)
    }
    
    console.log("returning"); 
    navigate(`/details/${id}`);
    setShow(false)
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
  console.log(laikinasBand,laikinasTitle)
  setEditData({...editData, band:laikinasBand, title:laikinasTitle, genre:laikinasGenre, year:laikinasYear, remaster:laikinasRemaster, serial:laikinasSerial, format:laikinasFormat})
  
 }

   
  return (
    <div>
        <Header/>
        <div className="entry-details">
            <div className="entry">
      <h2>Album details:</h2>
      <img src={entry.img || square} style={{width:"600px",height:"600px"}}/>
      <h3>{entry.band} - {entry.title}</h3>
      <p>Genres: {entry.genre}</p>
      <p>Format: {entry.format} Remastered: {entry.remaster} </p>
      <p>Serial number: {entry.serial}</p>
      <div className="entry-controls">
      <button onClick={() => setShow(true)}>Edit</button>
      <button onClick={handleDelete} style={{backgroundColor:"darkRed"}}>Delete</button>
   
      </div>
      {show == true &&
    <form  className='add-form' onSubmit={handleUpdate} >
     
      <h2>Change information:</h2>
      <label>Band name</label>
      <input ref={bandRef} type="text" onChange={handleInputChange}  placeholder={entry.band} /> 
      <label>Album title</label>
      <input ref={titleRef} type="text" onChange={handleInputChange} placeholder={entry.title} />
      <label>Genre description</label>
      <input ref={genreRef} type="text" onChange={handleInputChange} placeholder={entry.genre} />
      <label>Release year</label>
      <input ref={yearRef}type="number" onChange={handleInputChange} placeholder={entry.year}  />
      <label>Remaster/Bootleg/Original</label>
      <input ref={remasterRef} type="text" onChange={handleInputChange}  placeholder={entry.remaster} />
      <label>Serial number/Code</label>
      <input ref={serialRef}type="text" onChange={handleInputChange} placeholder={entry.serial} />
      <label>Release format</label>
      <input ref={formatRef} type="text" onChange={handleInputChange} placeholder={entry.format} />
      <div className="edit-controls">
      <button type="submit">Submit</button>
      <button className="close-button" onClick={() => setShow(false)} style={{backgroundColor:"darkRed"}}>Close</button>
      </div>
      </form>
      }
      <Link to='/'>Return to frontpage</Link>
    </div>

    </div>
    </div>
  )
}

export default EntryDetails
