import { createContext, useState } from "react"
import axios from "axios";
import { API_BASE_URL } from "../Url";

export let cartContext=createContext();

async function addToCart(productId){
  return  axios.post(API_BASE_URL + '/cart',{productId},{
    headers:{
        token:localStorage.getItem('token')
    }
  })
    .then(({data})=>data)
    .catch(err=>err)
}
async function getCart(){
  return  axios.get(API_BASE_URL + '/cart',{
    headers:{
        token:localStorage.getItem('token')
    }
  })
    .then(({data})=>data)
    .catch(err=>err)
}
async function deleteItem(productId){
    return axios.delete(API_BASE_URL+'/cart/'+productId,{
        headers:{
            token:localStorage.getItem('token')
        }
    }
    ).then(({data})=>data).catch(err=>err);   
}
async function updateQty(productId,count){
    return axios.put(API_BASE_URL+'/cart/'+productId,{count},{
        headers:{
            token:localStorage.getItem('token')
        }
    }
    ).then(({data})=>data).catch(err=>err);   
}
async function pay(cartId,shippingAddress){
    return axios.post(API_BASE_URL+'/orders/checkout-session/'+cartId,{shippingAddress},{
        headers:{
            token:localStorage.getItem('token')
        }
    }
    ).then(({data})=>data).catch(err=>err);   
}

export default function StoreCartContextProvider({children}) {
    let [counter,setCounter]=useState(0);
  return <cartContext.Provider value={{counter,setCounter,addToCart,getCart,deleteItem,updateQty,pay}}>
     {children}
  </cartContext.Provider>
}
