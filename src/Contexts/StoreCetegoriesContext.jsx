import { createContext } from "react";
import { API_BASE_URL } from "../Url";
import axios from "axios";
import { useQuery } from 'react-query';
export let storeCetagoriesContext=createContext(0);

export function StoreCetagoriesContextProvider({children}){
  
    function getCetagories(){
        return  axios.get(`${API_BASE_URL}/categories`);
      }
    function getSubCetagoriesOnCat(categoryId){
      return axios.get(`${API_BASE_URL}/categories/${categoryId}/subcategories`)
    }  
      let{data,isLoading}= useQuery('getCetagories',getCetagories,{
        cacheTime:300000,
        refetchOnWindowFocus:false
       });
       
    return <storeCetagoriesContext.Provider value={{data,isLoading,getSubCetagoriesOnCat}}>
       {children}
    </storeCetagoriesContext.Provider>
}