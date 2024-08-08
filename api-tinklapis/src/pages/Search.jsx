import { useRef, useState } from 'react'
import axios from 'axios';
import Header from '../components/Header'
import './Search.css'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import square from '../assets/square.png'

const Search = () => {
    const [bands, setBands] = useState([])
    const [error, setError] = useState('')
    const bandRef=useRef()
    const handleSearch = async (e) => {
        e.preventDefault()
        let artist = bandRef.current.value
    

        try {
          const response = await axios.get(
            `http://localhost:3000/testroute/search/${artist}`
          )
          setBands(response.data)
         
        } catch(error) {
          console.error('Error Fetching Entries', error)
          setError(error)
        }
          }
  return (
    <div>
    <Header/>

    <div className='searchwindow'>
        <div className="search-input">
        <form onSubmit={handleSearch}>
            <h2>Search by artist:</h2>
            <input type="text" ref={bandRef} />
            <button className='search-btn' type='submit'>Search</button>
        </form>
        </div>
    <div className="search-results">
        { bands.length > 0 &&
            bands.map((info) => (
                <div key={info._id} className='recordInfo'>
              <h2>{info.band}</h2>
              <p>{info.title} {info.format}</p>
              <img className="album-cover"src={info.img || square} alt={info.title} />
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

export default Search
