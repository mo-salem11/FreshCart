import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Contexts/StoreCartContext'
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Contexts/StoreWishlistContext';



function Product({item}) {
 let {setCounter,addToCart}=useContext(cartContext);
 let {setCounterWishlist,addToWishlist,deleteWishlist,getWishlist,setData}=useContext(wishlistContext)
 let [btnLoading,setBtnLoading]=useState(true);  
 let [btnWishlistLike,setBtnWishlistLike]=useState(()=>{
  return JSON.parse(localStorage.getItem(item._id)) || false;
 }); 
 const token=localStorage.getItem('token');
 useEffect(() => {
  // Update localStorage when the liked state changes
  localStorage.setItem(item._id, JSON.stringify(btnWishlistLike));
}, [btnWishlistLike, item._id,token]);

  async function addProductToCart(productId){
    setBtnLoading(false);
     let data= await addToCart(productId);
     if(data.status==='success'){
      toast.success('Product added successfully');
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
     }
}
  async function addProductToWishlist(productId){
     let data= await addToWishlist(productId);
     if(data.status==='success'){
      toast.success('Product added successfully');
      setCounterWishlist(data.data.length);
      setBtnWishlistLike(!btnWishlistLike);
     }
}
async function deleteProduct(productId){
  let deletedProduct= await deleteWishlist(productId);
  if(deletedProduct.status==="success"){
     toast.error("Product removed successfully to your wishlist");
     setCounterWishlist(deletedProduct.data.length); 
     let data=await getWishlist();
     setData(data);         
     localStorage.removeItem(productId);
     setBtnWishlistLike(!btnWishlistLike);
  }
 
}


return (
    <>
     <div className=" col-6 col-lg-2 col-md-3 col-sm-4">
                    <div className="product position-relative cursor-pointer bg-white  rounded-3 p-3">
                     <div className='position-absolute top-0 end-0'>
                      <button 
                      onClick={()=>{(btnWishlistLike)?deleteProduct(item?._id):addProductToWishlist(item?._id)}}
                      style={{
                        width:"36",height:"36",
                        borderRadius:"6px",backgroundColor:"rgb(255, 255, 255)"
                        ,filter:"drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 5px)"}}
                         className='d-flex btn justify-content-center align-items-center'>
                        {btnWishlistLike?  <i className='fa-solid text-danger  fa-heart cartIcon '></i>: <i className='fa-solid  fa-heart cartIcon '></i>}
                          </button>
                      </div>
                     <Link to={"/products/"+item?._id} className="text-decoration-none text-black">
                      <img height={200} className='w-100 rounded-3' src={item?.imageCover} alt="" />
                        <div>
                            <span className='text-main'>{item?.category?.name}</span>
                            <h5 className='text-wrap'>{item?.title?.split(' ').slice(0,2).join(' ')}</h5>
                            <div className='d-flex justify-content-between my-2'>
                              <div>{item?.price} EGP</div>
                              <div><i className='fa-solid fa-star rating-color'></i>{item?.ratingsAverage}</div>
                            </div>
                        </div>
                      </Link>
                     
                         <button disabled={!btnLoading} onClick={()=>(addProductToCart(item._id))} className='btn d-block m-auto bg-main px-1 fs-6  mb-3 text-light w-100 '>
                          {btnLoading?" Add to Card":"Loading..."}
                          </button> 
                    </div>
                   </div>
    </>
  )
}

export default Product