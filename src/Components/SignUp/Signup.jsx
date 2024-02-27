import axios from 'axios';
import {  useFormik } from 'formik'
import { API_BASE_URL } from '../../Url';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Signup() {
let navigate= useNavigate();

   const [errorMsg,setErr]=useState('');
   const [loading,setLoading]=useState(true);
   function sendData(values){
    setLoading(false);
      axios.post(`${API_BASE_URL}/auth/signup`,values).then(({data})=>{
        // console.log(data);
        if(data.message==="success"){
           navigate('/signin')
        }
      }).catch((err)=>{
        setErr(err.response.data.message);
        setLoading(true);
      })
      
   }
  function validationSchema(){
    let schema=new Yup.object({
      name:Yup.string().min(2).max(30).required(),
      email:Yup.string().email().required(),
      phone:Yup.string().matches(/^01(1|2|5|0)\d{8}$/).required(),
      password:Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
      rePassword:Yup.string().oneOf([Yup.ref('password')]).required(),

    })
    return schema;
  }
  let register=useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
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
                <title>Sign Up</title>
      </Helmet>
      <div  className='w-75 bg-main-light rounded-3 mx-auto p-5 my-5'>
          <h2>Register Now: </h2>
          <form onSubmit={register.handleSubmit}>
              <label className='fs-5 mt-3' htmlFor="name">Name :</label>
              <input onBlur={register.handleBlur} value={register.values.name} onChange={register.handleChange} id='name' name="name" type="text"  className='form-control' />
              {register.errors.name && register.touched.name? <div className="alert alert-danger mt-2">{register.errors.name}</div> :null}


              <label className='fs-5 mt-3' htmlFor="email">Email :</label>
              <input onBlur={register.handleBlur}  onChange={register.handleChange}  id='email' type="email" className='form-control' />
              {register.errors.email && register.touched.email ? <div className="alert alert-danger mt-2">{register.errors.email}</div> :null}

              <label className='fs-5 mt-3' htmlFor="phone">Phone :</label>
              <input onBlur={register.handleBlur} onChange={register.handleChange} id='phone' type="tel"  className='form-control' />
              {register.errors.phone && register.touched.phone ? <div className="alert alert-danger mt-2">{register.errors.phone}</div> :null}

              <label className='fs-5 mt-3' htmlFor="password">Passowrd :</label> 
              <input onBlur={register.handleBlur} onChange={register.handleChange} id='password' type="password"  className='form-control' />
              {register.errors.password && register.touched.password ? <div className="alert alert-danger mt-2">{register.errors.password}</div> :null}
       
              <label className='fs-5 mt-3' htmlFor="rePassword">rePassword :</label>
              <input onBlur={register.handleBlur} onChange={register.handleChange} id='rePassword' type="password"  className='form-control' />
              {register.errors.rePassword && register.touched.rePassword ? <div className="alert alert-danger mt-2">{register.errors.rePassword}</div> :null}

             {errorMsg?<div className="alert alert-danger mt-3">{errorMsg}</div>:''}
             <button disabled={!(register.dirty&&register.isValid)} type='submit' className='btn btn-lg d-block ms-auto mt-3 btn-success'>
               {loading?'Signup':<i className='fa fa-spinner fa-spin'></i>}
             </button>

          </form>
      </div>
    </>
  )
}

export default Signup