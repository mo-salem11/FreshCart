import React , { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Contexts/StoreWishlistContext';
import { cartContext } from '../../Contexts/StoreCartContext';



export default function WishlistProduct({item2,setData}) {
    let {setCounter,addToCart}=useContext(cartContext);
    let {deleteWishlist,setCounterWishlist,getWishlist}=useContext(wishlistContext);
    let [btnLoadingWishlist,setBtnLoadingWishlist]=useState(false);
    let [btnLoading,setBtnLoading]=useState(true);  
   

    async function deleteProduct(productId){
        setBtnLoadingWishlist(true);
        let deletedProduct= await deleteWishlist(productId);
        if(deletedProduct.status==="success"){
           toast.error("Product removed successfully to your wishlist");
           setCounterWishlist(deletedProduct.data.length); 
           let data=await getWishlist();
           setData(data);         
           setBtnLoadingWishlist(false);
           localStorage.removeItem(productId);
        }
       
      }
    
      async function addProductToCart(productId){
        setBtnLoading(false);
         let data= await addToCart(productId);
         if(data.status==='success'){
          toast.success('Product added successfully');
          setCounter(data.numOfCartItems);
          setBtnLoading(true);
         }
    }
   return (
    <>
      <div  className="row py-2 border-bottom">
    <div  className="col-md-1">
      <img className='w-100' src={item2?.imageCover} alt="" />
    </div>
   <div className="col-md-11 d-flex justify-content-between align-items-center">
     <div className=''>
        <p className='m-1'>{item2?.title}</p>
        <p className='text-main m-1'>Price : {item2.price}</p>
       {!btnLoadingWishlist? <button onClick={()=>deleteProduct(item2._id)} className='btn p-0'> <i className='fa-solid text-main fa-trash-can'></i><span className='text-main ms-1 fw-bold'>remove</span></button>:<div className='ms-4'><i className='fa fa-spinner fs-4 text-main fa-spin'></i></div>}
     </div>
     <button disabled={!btnLoading} onClick={()=>(addProductToCart(item2._id))} className='btn d-block ms-auto bg-main px-1 fs-6  mb-3 text-light w-25 '>
                          {btnLoading?" Add to Card":"Loading..."}
                          </button> 
   </div>
   </div>
    </>
   )
}
