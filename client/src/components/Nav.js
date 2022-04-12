import react from 'react'
import { Link } from 'react-router-dom'
const Nav=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">

  <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarText">
    <ul class="navbar-nav mr-auto ">
      <li className="nav-item active">
        <Link to='/login' className="nav-link" >Login </Link>
      </li>
      <li className="nav-item">
        <Link to='/register' className="nav-link" >Register</Link>
      </li>
     
    </ul>
   
  </div>
</nav>
    )
}
export default Nav