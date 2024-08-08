import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <div className='header-container'>
    <div className="header">
    <NavLink to="/"><h2 className='logo'>Record Collection API</h2></NavLink>
    <div className="header-links nav">

      <NavLink className='pradinis-link' to="/"> <h3 className='pradinis-link'>Collection</h3></NavLink>
      <NavLink to='/newentry'> <h3>Add a new record</h3></NavLink> 
     <NavLink to='/search'> <button>Search <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path><path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path></svg></button></NavLink>

    </div>
</div>
</div>
  )
}

export default Header
