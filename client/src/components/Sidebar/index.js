import React from 'react'
import { Link ,Navbar,Container,Nav,NavDropdown} from 'react-router-dom'

import './styles.css'

export default function Sidebar() {
    const logout=()=>{
        localStorage.removeItem("token");
        
    }
  return (
    <div >
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ">
        <div className='mr-4  '>
        <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className='mr-4'>
        <Link to="/planjourney">planJourney</Link>
        </div>
        <div className='mr-10'>
        <Link to="/Login" onClick={logout}>Logout</Link>
        </div>
        

      
      
    </div>
  </div>
</nav>

    </div>
  )
}
