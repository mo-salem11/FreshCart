import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Contexts/StoreCartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import CartProduct from './CartProduct';
import axios from 'axios';
import { API_BASE_URL } from '../../Url';
import { Helmet } from 'react-helmet';
function Cart() {
  
let {getCart,counter,setCounter}=useContext(cartContext);
let [Data,setData]=useState(null);
let [loading,setLoading]=useState(true);

useEffect(() => {
  const getCartContext = async () => { 
    try {
      let data = await getCart();
      if (data?.response?.data.statusMsg === "fail") {
        setData(null);
      } else {     
        setData(data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  getCartContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  async function clearCart(){
    const {data}=await axios.delete(API_BASE_URL+'/cart',{
      headers:{
        token:localStorage.getItem('token'),
      }
    });
    setData(data);
    setCounter(0);
  }

  if(loading)return <Loading/>
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
      </Helmet>
     <div className="container p-4 my-3 rounded-2 bg-main-light">
       <h2 className='fw-bolder fs-2'>Shop Cart:</h2>
       <div className='d-flex mb-3 justify-content-between align-items-center'>
      {Data?.data?.totalCartPrice&& <p className='text-main fs-5 fw-bolder'>Total Cart Price : {Data?.data?.totalCartPrice} EGP</p>}
        <button onClick={clearCart} className='btn btn-lg btn-outline-danger d-block'>Clear Cart</button>
       </div>
      
       {
        Data?.data?.products.map((item)=>{
           return (
           <CartProduct key={item._id} item={item} setData={setData}/>
           )
        })
       }
    {(!counter || Data==null )&&<div className='p-3 fw-bold my-5 bg-success-subtle fs-2 text-center'>No products in your Cart</div>}
       {(counter ||Data!=null )&&<Link to={`/shipping/${Data?.data?._id}`} className='btn my-4 btn-lg bg-main text-white w-25 d-block mx-auto'>Place Order</Link>}
       </div>
    
    </>
  )
}

export default Cart