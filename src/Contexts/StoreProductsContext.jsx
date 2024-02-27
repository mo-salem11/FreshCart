import { createContext } from "react";
import { API_BASE_URL } from "../Url";
import axios from "axios";
import { useQuery } from 'react-query';
export let storeProductsContext=createContext(0);

export function StoreProductsContextProvider({children}){
   
    function getProducts(){
        return  axios.get(`${API_BASE_URL}/products`);
      }
      let{data,isLoading}= useQuery('getProducts',getProducts,{
        cacheTime:300000,
        refetchOnWindowFocus:false
       });

     async function sendProductsCatById(id){
         const products=await getProducts();
        
         if(products.status===200){
          return getProducts().data?.data?.filter(product => product.category._id === id);
         }
       
       }
       let {data:dataCat}= useQuery('sendProductsCatById',sendProductsCatById,{
        cacheTime:300000,
        refetchOnWindowFocus:false
       });
    return <storeProductsContext.Provider value={{data,isLoading,dataCat,sendProductsCatById}}>
       {children}
    </storeProductsContext.Provider>
}