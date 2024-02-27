import React from 'react'
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import  logo from '../../images/freshcart-logo.svg';
function AuthLayout() {
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid mx-3">
        <NavLink to="/" className="navbar-brand fw-bold fs-3">
          <img src={logo} alt="Fresh Cart" />
        </NavLink>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          
          <ul className="navbar-nav navbar-second ms-auto mt-2 mt-lg-0 align-items-center"> 
            <li className="nav-item">
              <NavLink to="/signin" className="nav-link fs-5">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link fs-5">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>  
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AuthLayout