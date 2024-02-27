import React , { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { cartContext } from '../../Contexts/StoreCartContext';


export default function CartProduct({item,setData}) {
  
    let {deleteItem,setCounter,updateQty}=useContext(cartContext);
    let [btnLoading,setBtnLoading]=useState(false);
    
    // useEffect(()=>{
    //  return clearTimeout();
    // },[])
   
    async function deleteProduct(productId){
        setBtnLoading(true);
        let deletedProduct= await deleteItem(productId);
        if(deletedProduct.status==="success"){
           toast.error("Product deleted successfully.");
           setCounter(deletedProduct.numOfCartItems);
           setData(deletedProduct);
        }
       
      }
    
      async function updateProductQuantity(productId,count){
           
                if(count===0){
                    deleteProduct(productId);
                }
                else{
                 let data= await updateQty(productId,count);
                 if(data.status==="success"){
                 toast.success("Product updated successfully")
                  setCounter(data.numOfCartItems);
                  setData(data); 
               }
             }  
       }
    
    return (
      
    <div  className="row py-2 border-bottom">
    <div  className="col-md-1">
      <img className='w-100' src={item?.product.imageCover} alt="" />
    </div>
   <div className="col-md-11 d-flex justify-content-between align-items-center">
     <div className=''>
        <p className='m-1'>{item.product.title}</p>
        <p className='text-main m-1'>Price : {item.price}</p>
       {!btnLoading? <button onClick={()=>deleteProduct(item.product._id)} className='btn p-0'> <i className='fa-solid text-main fa-trash-can'></i><span className='text-main ms-1 fw-bold'>remove</span></button>:<div className='ms-4'><i className='fa fa-spinner fs-4 text-main fa-spin'></i></div>}
     </div>
     <div className='d-flex justify-content-center align-items-center text-main border'>
       <button onClick={()=>{updateProductQuantity(item.product._id,item.count+1)}} className='btn  btn-sm '><i className="fa-solid text-main fa-plus"></i></button>
       <span className='border fs-5  p-1'>{item.count}</span>
       <button onClick={()=>{updateProductQuantity(item.product._id,item.count-1)}} className='btn  btn-sm '><i className="fa-solid text-main fa-minus"></i></button>
     </div>
   </div>
   </div>

  )
 }
