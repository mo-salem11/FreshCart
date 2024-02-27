// import axios from 'axios';
import {  useFormik } from 'formik'
// import { API_BASE_URL } from '../../Url';
import React, { useContext, useState } from 'react'

import {  useParams } from 'react-router-dom';
import { cartContext } from '../../Contexts/StoreCartContext';
function Address() {
// let navigate= useNavigate();

let {id}=useParams();

 let {pay}=   useContext(cartContext)
  
   const [loading,setLoading]=useState(true);
   


 async  function sendData(values){
    setLoading(false);
     let data=await pay(id,values);
      setLoading(true);
      if(data.status==='success'){

         window.location.href=data.session.url;
      } 
   }

  let address=useFormik({
    initialValues:{
     
      details:'',
      phone:'',
      city:''
     
    },
    onSubmit:(values)=>{
    
      //send to api
      sendData(values);
    }
  })

  return (
    <>
      <div  className='w-75 rounded-3 mx-auto bg-main-light p-5 my-5'>
          <h2>address Now: </h2>
          <form onSubmit={address.handleSubmit}>
              

              <label className='fs-5 mt-3' htmlFor="details">Details :</label>
              <textarea onBlur={address.handleBlur}  onChange={address.handleChange}  id='details' type="text" className='form-control'></textarea>

              <label className='fs-5 mt-3' htmlFor="phone">Phone :</label> 
              <input onBlur={address.handleBlur} onChange={address.handleChange} id='phone' type="tel"  className='form-control' />
             
              <label className='fs-5 mt-3' htmlFor="city">City :</label> 
              <input onBlur={address.handleBlur} onChange={address.handleChange} id='city' type="text"  className='form-control' />
              
              
             
           
             <button disabled={!(address.dirty&&address.isValid)} type='submit' className='btn btn-lg d-block ms-auto mt-3 btn-success'>
               {loading?'Next':<i className='fa fa-spinner fa-spin'></i>}
             </button>

          </form>
      </div>
    </>
  )
}

export default Address