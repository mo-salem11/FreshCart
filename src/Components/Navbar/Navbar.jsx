import React, { useContext, useEffect } from 'react';
import  logo from '../../images/freshcart-logo.svg';
import styles from './navbar.module.css';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Contexts/StoreCartContext';
import { wishlistContext } from '../../Contexts/StoreWishlistContext';

function Navbar() {
let {counter,getCart,setCounter}=  useContext(cartContext);
let {counterWishlist,getWishlist,setCounterWishlist}=useContext(wishlistContext)
  const isMobile=useMediaQuery({ maxWidth: 991 })
 const navigate=useNavigate();
 useEffect(()=>{
 ( async()=>{ 
   let data=await getCart();
   setCounter(data.numOfCartItems)
  })()
 },[])
 
 useEffect(()=>{
 ( async()=>{ 
   let data=await getWishlist();
   setCounterWishlist(data.count)
  })()
 },[])
 


 function logOut(){
   localStorage.removeItem('token');
   navigate('/signin');
 }
 
 return (
   <>
  
     <nav className="navbar position-fixed  start-0 top-0 z-3 end-0 navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid mx-3">
        <NavLink to="/" className="navbar-brand fw-bold fs-3">
          <img src={logo} alt="Fresh Cart" />
        </NavLink>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          
        {isMobile?null:(
          <ul className="navbar-nav me-auto mt-2 mt-lg-0 align-items-center">
          <li className="nav-item">
            <NavLink to="home" className="nav-link fs-5">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fs-5" to="/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="categories" className="nav-link  fs-5">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="cart" className="nav-link fs-5">Cart</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="brands" className="nav-link fs-5">Brands</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="allorders" className="nav-link fs-5">Orders</NavLink>
          </li>
       </ul>
       )}
      
          <ul className="navbar-nav navbar-second ms-auto mt-2 mt-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="cart" className="nav-link fs-5 position-relative">
                  <i className='fa-solid fs-4 fa-cart-shopping cartIcon mx-2'></i> 
                  {
                    counter? <span style={{fontSize:'13px'}} className={`position-absolute bg-danger top-0 start-100 badge rounded mt-2 translate-middle`}>
                    {counter}
                    <span  className='visually-hidden'>unread messages</span>
                </span>:""
                  }
    
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="wishlist" className="nav-link fs-5 position-relative mx-3">
                  <i className='fa-solid fs-4 fa-heart cartIcon mx-2'></i> 
                  {
                    counterWishlist? <span style={{fontSize:'13px'}} className={`position-absolute bg-danger top-0 start-100 badge rounded mt-2 translate-middle`}>
                    {counterWishlist}
                    <span  className='visually-hidden'>unread messages</span>
                </span>:""
                  }
    
              </NavLink>
            </li> 
            <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   <span className='nav-link'><i className="fa-solid fs-4 fa-user"></i></span>
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink to="user-profile" className="dropdown-item">User Profile</NavLink></li>
                  <li><span onClick={logOut} className="nav-link dropdown-item fs-6 px-3 cursor-pointer">LogOut</span></li>
                </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
    {
        isMobile&&(
        <div className={`${styles.navbar_bottom} navbar-bottom`}>
           <ul className='navbar-nav navbar-third m-auto mt-2 mt-lg-0 justify-content-around d-flex  align-items-center'>
            <li className="list nav-item">
              <NavLink to="/home" className="nav-link d-flex flex-column">
                <span className="icon text-center fs-4"><i className="fa-solid fa-house"></i></span>
                <span className="text">Home</span>
              </NavLink>
            </li>
            <li className="list nav-item">
              <NavLink to="/products" className="nav-link d-flex flex-column">
                <span className="icon text-center fs-4"><i className="fa-solid fa-boxes-stacked"></i></span>
                <span className="text">Products</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="categories" className="nav-link d-flex flex-column">
                <span className="icon text-center fs-4"><i className="fa-solid fa-list-ul"></i></span>
                <span className="text">Categories</span>
              </NavLink> 
            </li>
            <li className=" nav-item">
              <NavLink className="nav-link d-flex flex-column" to="brands">
                <span className="icon text-center fs-4"><i className="fa-regular fa-copyright"></i></span>
                <span className="text">Brands</span>
              </NavLink>    
            </li>
            <li className=" nav-item">
              <NavLink className="nav-link d-flex flex-column" to="allorders">
                <span className="icon text-center fs-4"><i className="fa-solid fa-arrows-spin"></i></span>
                <span className="text">Orders</span>
              </NavLink>    
            </li>
          </ul>
        </div>
      

         
        )
       }
   </>
  )
}

export default Navbar