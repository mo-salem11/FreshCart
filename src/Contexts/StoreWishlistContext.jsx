import { createContext, useState } from "react"
import axios from "axios";
import { API_BASE_URL } from "../Url";

export let wishlistContext=createContext();

async function addToWishlist(productId){
    return  axios.post(API_BASE_URL + '/wishlist',{productId},{
      headers:{
          token:localStorage.getItem('token')
      }
    })
      .then(({data})=>data)
      .catch(err=>err)
  }

  async function getWishlist(){
    return  axios.get(API_BASE_URL + '/wishlist',{
      headers:{
          token:localStorage.getItem('token')
      }
    })
      .then(({data})=>data)
      .catch(err=>err)
  }
  async function deleteWishlist(productId){
    return axios.delete(API_BASE_URL+'/wishlist/'+productId,{
        headers:{
            token:localStorage.getItem('token')
        }
    }
    ).then(({data})=>data).catch(err=>err);   
}
export default function StoreWishlistContext({children}) {
  
    let [counterWishlist,setCounterWishlist]=useState(0);
    let [Data,setData]=useState(null);
    return <wishlistContext.Provider value={{counterWishlist,setCounterWishlist,addToWishlist,getWishlist,deleteWishlist,Data,setData}}>
        {children}
    </wishlistContext.Provider>
  
}
