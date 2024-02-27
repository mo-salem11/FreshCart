import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { API_BASE_URL } from '../../Url';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function ForgetPassword() {
    const [loading,setLoading]=useState(true);
    const [loadingverify,setLoadingVerify]=useState(true);
   let navigate= useNavigate();
   let [errmsg,setErr]=useState("");
   let [formStatus,setFromStatus]=useState(true);
   let validationSchema=Yup.object({
        email:Yup.string().required("email Required").email("enter Valid Email"),
    });
   let validationSchema2=Yup.object({
        resetCode:Yup.string().required("resetCode Required").matches(/^[0-9]{4,6}$/,"enter valid code"),
    });
    let Formik=useFormik({
        initialValues:{
            email:""
        },
        onSubmit:ForgetPasswordApi,
        validationSchema
    })
    let Formik2=useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:VerifyResetCode,
        validationSchema:validationSchema2
    })
    async function ForgetPasswordApi(value){
        setLoading(false);
        let req=await axios.post(API_BASE_URL+"/auth/forgotPasswords"
        ,value).catch((err)=>{
            setErr(err.response.data.message);
            setLoading(true);
        });
         if(req.data.statusMsg==='success'){
           setFromStatus(false);
         }
    }
  async function VerifyResetCode(value){
    setLoadingVerify(false);
    let req=await axios.post(API_BASE_URL+'/auth/verifyResetCode',value)
    .catch((err)=>{
      setErr(err.response.data.message);
      setLoadingVerify(true);
    })
    if(req.data.status==="Success"){
      setLoadingVerify(true);
      navigate("/reset-password")
    }
   
   }
 
    return (
      <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Forget Password</title>
    </Helmet>
    <div className='w-75 rounded-3 bg-main-light mx-auto p-5 my-5'>
    {errmsg?<div className='alert alert-danger'>{errmsg}</div>:""}
    { formStatus? <form onSubmit={Formik.handleSubmit}>
        <label className='fs-4' htmlFor="email">Enter Your Email :</label>
        <input className='form-control' id="email" onBlur={Formik.handleBlur} onChange={Formik.handleChange} name="email" type="email" />
        <button disabled={!(Formik.dirty&&Formik.isValid)} type='submit' className='btn mt-3 bg-main d-block ms-auto text-light'>
        {loading?'Send':<i className='fa fa-spinner fa-spin'></i>}
        </button>
      </form>
     
     :
     
      <form onSubmit={Formik2.handleSubmit}>
        <label className='fs-4' htmlFor="resetCode">Enter reset code :</label>
        <input value={Formik2.values.resetCode} onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} className='form-control' id="resetCode"  type="text" name="resetCode" />
        {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='alert alert-danger'>{Formik2.errors.resetCode}</div>:""}
        <button type='submit' className='btn mt-3 bg-main d-block ms-auto text-light'>
          
          {loadingverify?'Verify Code':<i className='fa fa-spinner fa-spin'></i>}  
        </button>
      </form>}
    </div>
    </>
  )
}

export default ForgetPassword