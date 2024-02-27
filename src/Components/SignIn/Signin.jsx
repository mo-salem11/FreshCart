import axios from 'axios';
import {  useFormik } from 'formik'
import { API_BASE_URL } from '../../Url';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Signin() {
let navigate= useNavigate();

   const [errorMsg,setErr]=useState('');
   const [loading,setLoading]=useState(true);
   function sendData(values){
    setLoading(false);
      axios.post(`${API_BASE_URL}/auth/signin`,values).then(({data})=>{
        console.log(data);
        if(data.message==="success"){
          localStorage.setItem('token',data.token)
           navigate('/home')
        }
      }).catch((err)=>{
        setErr(err.response.data.message);
        setLoading(true);
      })
      
   }
  function validationSchema(){
    let schema=new Yup.object({
      email:Yup.string().email().required(),
      password:Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(), 

    })
    return schema;
  }
  let register=useFormik({
    initialValues:{
     
      email:'',
      password:'',
     
    },
   validationSchema,
    onSubmit:(values)=>{
    
      //send to api
      sendData(values);
    }
  })

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>SignIn</title>
      </Helmet>
      <div className='w-75 rounded-3 bg-main-light mx-auto p-5 my-5'>
          <h2>Register Now: </h2>
          <form onSubmit={register.handleSubmit}>
              

              <label className='fs-5 mt-3' htmlFor="email">Email :</label>
              <input onBlur={register.handleBlur}  onChange={register.handleChange}  id='email' type="email" className='form-control' />
              {register.errors.email && register.touched.email ? <div className="alert alert-danger mt-2">{register.errors.email}</div> :null}

             

              <label className='fs-5 mt-3' htmlFor="password">Passowrd :</label> 
              <input onBlur={register.handleBlur} onChange={register.handleChange} id='password' type="password"  className='form-control' />
              {register.errors.password && register.touched.password ? <div className="alert alert-danger mt-2">{register.errors.password}</div> :null}
       
              
              <Link to="/forget-password" className='fs-5 text-decoration-none text-main mt-2'>Forgot Password ?</Link>
             {errorMsg?<div className="alert alert-danger mt-3">{errorMsg}</div>:''}
             <button disabled={!(register.dirty&&register.isValid)} type='submit' className='btn btn-lg d-block ms-auto mt-3 btn-success'>
               {loading?'Signup':<i className='fa fa-spinner fa-spin'></i>}
             </button>

          </form>
      </div>
    </>
  )
}

export default Signin