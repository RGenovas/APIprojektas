import { useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './Homepage.css'
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import square from '../assets/square.png'

const Homepage = () => {
    const [content, setContent] = useState ([])
 
    useEffect(() => {
            
      const getEntries = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3000/testroute'
          )
          setContent(response.data)
         
        } catch(error) {
          console.error('Error Fetching Entries', error)
        }
          }
          getEntries() },[content])
  return (
    

    <div>
        <Header/>
   <div className="App">
      <div className="home-content">
        {content.length>0 &&
          content.map((info) => (
            <div key={info._id} className='recordInfo'>
              <h2>{info.band}</h2>
              <p>{info.title} {info.format}</p>
              <img className="album-cover"src={info.img || square} alt="albumimg" />
              <p>{info.genre} {info.year}</p>
              <p>Remastered:{info.remaster}</p>
            <Link to={`/details/${info._id}`}> <button>Details</button></Link> 
            </div>
          ))
        }
      </div>
    </div>
        <Footer/>
    </div>
  )
}

export default Homepage
