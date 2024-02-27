import React from 'react'
import visa from '../../images/card-visa.png'
import master from '../../images/card-mastercard.png'
import amex from '../../images/card-amex.png'
import valu from '../../images/valu_v2.png'
import googleplay from '../../images/google-play.png'
import AppStore from '../../images/app-store.png'
function Footer() {
  return (
    <>
     <div style={{paddingBottom:'100px'}} className='px-5 pt-5 bg-main-light'>
     
         <h2 className='fw-bolder'>Get the FreshCart app</h2>
         <p className='text-muted fs-5 m-0'>We will send you a link, open it in your phone to download the app</p>
         <div className='border-bottom pb-4 mt-3 d-flex align-items-center'>
         <input type="text" className='form-control p-2 w-75 ' placeholder='email...' />
         <button className='btn  bg-main text-light px-4 py-2 ms-3'>Share App Link</button>
         </div>
         <div className='my-3 d-flex flex-wrap justify-content-between align-items-center'>
           <div className='d-flex  align-items-center'>
             <p className='me-1 fs-5 mt-3'>Payment Partner</p>
             <div>
              <img width={40} src={visa} alt="" />
              <img width={40} src={master} alt="" />
              <img width={40} src={amex} alt="" />
              <img width={40} src={valu} alt="" />
             </div>
           </div>
           <div className='d-flex  align-items-center'>
             <p className='fs-5 mt-3 me-1'>Get deliveries with FreshCart</p>
             <div>
               <img width={100} src={ googleplay} alt="" />
               <img width={100} src={ AppStore} alt="" />
             </div>
           </div>
           <div></div>
         </div>
     </div>
    </>
  )
}

export default Footer