import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Contexts/StoreWishlistContext';
import Loading from '../Loading/Loading';
import WishlistProduct from '../WishlistProduct/WishlistProduct';
import { Helmet } from 'react-helmet';

function Wishlist() {
  let {getWishlist,Data,setData}=useContext(wishlistContext);
  let [loading,setLoading]=useState(true);
 
  useEffect(()=>{
    const getwishlistContext= async()=>{
   try{ 
      let data=await getWishlist();
       if(data.status==="success"){
        setData(data);
       } 
      setLoading(false);
     }
    
    catch (error) {
      console.error("Error fetching Wishlist:", error);
    }
  };
  getwishlistContext();
} ,[]) ;
    
   if(loading)return <Loading/>
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist</title>
      </Helmet>
     <div className="container p-4 my-3 rounded-2 bg-main-light">
       <h2 className='fw-bolder fs-2'>Shop Wishlist:</h2>
       <div className='d-flex mb-3 justify-content-between align-items-center'>
       </div>
      
       {
        Data?.data?.map((item2)=>{
           return (
           <WishlistProduct key={item2._id} item2={item2} setData={setData}/>
           )
        })
       }
    {(Data==null)&&<div className='p-3 fw-bold my-5 bg-success-subtle fs-2 text-center'>No products in your Wishlist</div>}
       </div>
    </>
  )
}

export default Wishlist