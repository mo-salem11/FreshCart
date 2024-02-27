import React from 'react';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BreadCrumb from '../BreadCrumb/BreadCrumb'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    
    <NavBar/>
    <BreadCrumb/>  
    <div  style={{marginTop:"5rem"}}>
    <Outlet />
    </div>
   
    <Footer/>
    </>
  )
}

export default Layout