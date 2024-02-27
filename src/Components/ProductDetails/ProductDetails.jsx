import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../Url';
import { cartContext } from '../../Contexts/StoreCartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { wishlistContext } from '../../Contexts/StoreWishlistContext';
import StarRating from '../../Components/StarRating/StarRating'
function ProductDetails() {
    let [btnLoading,setBtnLoading]=useState(true);
    let {setCounter,addToCart}=useContext(cartContext);
    let {setCounterWishlist,addToWishlist,deleteWishlist,getWishlist,setData}=useContext(wishlistContext)
    let [productDetails,setProduct]=useState([]);
    let [btnWishlistLike,setBtnWishlistLike]=useState(()=>{
      return JSON.parse(localStorage.getItem(productDetails._id)) || false;
     });
    var settings={
        dots:true,
        infinite:true,
        speed:100,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        arrows:false
      };



 let x=useParams();

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

 async function addProductToCart(productId){
    setBtnLoading(false);
     let data= await addToCart(productId);
     if(data.status==='success'){
      toast.success('Product added successfully');
      setCounter(data.numOfCartItems);
       setBtnLoading(true);
     }
}

 async function getProduct(){
    let {data}= await axios.get(`${API_BASE_URL}/products/${x.id}`);
    setProduct(data.data);
    
 }
 useEffect(()=>{
    getProduct();
 },[]);
   
 return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
      </Helmet>
    <div style={{paddingBottom:'60px'}} className=" container">
    <div className='row align-items-center py-4'>
    <div className="col-md-4">
        <Slider {...settings}>
            {productDetails.images?.map((image ,index)=>{
                return  <img key={index} height={500} className='w-100' src={image} alt="" />
            })}
        </Slider>    
    </div>
       <div className="col-md-8 mt-4 text-center">
        <div className='d-flex justify-content-around align-items-center'>
        <h2 className="h4 fw-bolder mb-2">{productDetails?.title}</h2>
        <button 
                      onClick={()=>{(btnWishlistLike)?deleteProduct(productDetails?._id):addProductToWishlist(productDetails?._id)}}
                      style={{
                        width:"36",height:"36",
                        borderRadius:"6px",backgroundColor:"rgb(255, 255, 255)"
                        ,filter:"drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 5px)"}}
                         className='d-flex btn justify-content-center align-items-center'>
                        {btnWishlistLike?  <i className='fa-solid text-danger  fa-heart cartIcon '></i>: <i className='fa-solid  fa-heart cartIcon '></i>}
                          </button>
        </div>
        <p className="text-muted p-3">{productDetails?.description}</p>
        <div className="d-flex my-4 justify-content-around align-items-center">
            <span className="text-muted fw-bold font-md">{productDetails?.price} EGP</span>
            <div className='d-flex justify-content-center align-items-center'>
            <StarRating apiRating={productDetails?.ratingsAverage}/>
            <span className="text-muted ms-2 fw-bold font-md">
              {productDetails?.ratingsAverage}
              </span>
            </div>
        </div>
        <button disabled={!btnLoading} onClick={()=>(addProductToCart(productDetails._id))} className='btn d-block m-auto bg-main px-1 fs-6  mb-3 text-light w-100 '>
                          {btnLoading?" Add to Card":"Loading..."}
                          </button> 
       </div>
    </div>
    </div>
    
   


    </>
  )
}

export default ProductDetails