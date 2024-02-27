import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { API_BASE_URL } from '../../Url';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function ResetPassword() {
    let [loading,setLoading]=useState(true);
    let [errmsg,setErr]=useState("");
    let navigate=useNavigate();
  let validationSchema=Yup.object({
    email:Yup.string().email().required(),
    newPassword:Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/,"enter valid newPassword").required("newPassword Required"), 
  })
  let formik=  useFormik({
    initialValues:{
       email:"",
        newPassword:"",
    },
    onSubmit:ResetPasswordApi,
    validationSchema,
})
async function ResetPasswordApi(value){
        setLoading(false);
         let req=await axios.put(API_BASE_URL+'/auth/resetPassword',value)
         .catch((err)=>{
            setErr(err.response.data.message);
            setLoading(true);
          })
         if(req.data.token){
            setLoading(true);
            navigate('/signin');
        }
   }
   
   return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
      </Helmet>
    <div className='w-75 rounded-3 bg-main-light mx-auto p-5 my-5'>
        <h2 className='h1 fw-bolder text-center'>Reset Password</h2>
        {errmsg?<div className='alert alert-danger'>{errmsg}</div>:""}
        <form onSubmit={formik.handleSubmit}>
          <label className='fs-5 mt-3' htmlFor="email">Email :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' 
          type="email" id="email" name="email" />
         {(formik.errors.email && formik.touched.email)?
           <div>{formik.errors.email}</div>:""}



          <label className='fs-5 mt-3' htmlFor="newPassword">newPassword :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' id="newPassword" name="newPassword"  />
           {(formik.errors.newPassword && formik.touched.newPassword)?
        <div>{formik.errors.newPassword}</div>:""}
 
 <button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn btn-lg d-block ms-auto mt-3 btn-success'>
               {loading?'Update Password':<i className='fa fa-spinner fa-spin'></i>}
             </button>
        </form>
    </div>
    </>
  )
}

export default ResetPassword