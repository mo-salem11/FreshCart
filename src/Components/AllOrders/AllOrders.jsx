import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { API_BASE_URL } from '../../Url';
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';
export default function AllOrders() {
   
    const [orders,setOrders]=useState([]);
    let [loading,setLoading]=useState(true);

    async function getAllOrders(id){
        
        const {data}=await axios.get(API_BASE_URL+'/orders/user/'+id) ;
        if(data){
          setOrders(data);
          setLoading(false);
        }
       
    }
    useEffect(()=>{
        const {id}=jwtDecode(localStorage.getItem('token'));
       getAllOrders(id);
    },[]);
    if (loading)return <Loading/>
    return (
      <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Orders</title>
     </Helmet>
    <div className='container p-4 my-3 rounded-2 bg-main-light'>
    <h2 className='fw-bolder h1 text-center mb-5'>Your Orders</h2>
    {

      orders.map((order)=>{
        return <div key={order.id} className='border-bottom my-3'>
            <h3 className='text-muted'>You have ordered  <span className='fs-1 fw-bolder text-main'>{order.cartItems.length}</span>   items.</h3>
            <div className='d-flex flex-wrap my-3'>
                {order.cartItems.map((item,index)=>{
                   return <img key={index} style={{width:"60px"}} className='me-2 mb-2' src={item.product.imageCover} alt="" /> 
                })} 
            </div>
            <h4 className='mb-3'>Total amount: <span className='fs-3 fw-bolder text-main'>{order.totalOrderPrice}</span> EGP.</h4>
        </div>
      })  
    }
    </div>
    </>
  )
}
