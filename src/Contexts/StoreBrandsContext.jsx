import React, { createContext } from 'react'
import { API_BASE_URL } from '../Url';
import Loading from '../Components/Loading/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
export let storeContextBrand=createContext();
export function StoreBrandsContext({children}) {
 function getBrands(){
    return axios.get(`${API_BASE_URL}/brands`);
  }
  let{data,isLoading}= useQuery('getBrands',getBrands,{
    cacheTime:300000,
    refetchOnWindowFocus:false
   });
   if(isLoading)return <Loading/> 
  return (
   <storeContextBrand.Provider value={{data}}>
      {children}
   </storeContextBrand.Provider>
  )
}

export default StoreBrandsContext