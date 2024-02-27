import React, { useContext, useState } from 'react'
import { storeCetagoriesContext } from '../../Contexts/StoreCetegoriesContext';
import CetagorySlider from '../CetagorySlider/CetagorySlider';
import axios from 'axios';
import { API_BASE_URL } from '../../Url';
import {storeProductsContext} from '../../Contexts/StoreProductsContext';
import SubCetagory from '../SubCetagorySlider/SubCetagory';
import { useQuery } from 'react-query';
import Product from '../Product/Product';
import { Helmet } from 'react-helmet';
function Categories() {
  let dataProducts= useContext(storeProductsContext);
 
  let [displayProducts,setProducts]=useState(dataProducts.data?.data?.data);
  
   
  
  
   const handleIdFromCat=(id)=>{
    const filteredSubProducts = dataProducts.data?.data?.data?.filter(product => product.category._id === id.productId);
    setProducts(filteredSubProducts);
   }
   const handleIdFromSubCat=(id)=>{
    const filteredSubProducts = dataProducts.data?.data?.data?.filter(product => product.subcategory[0]._id === id);
    setProducts(filteredSubProducts);
   }
  function getSubCategories(){
        return  axios.get(`${API_BASE_URL}/subcategories`);
      }
      let dataSub= useQuery('getSubCategories',getSubCategories,{
        cacheTime:300000,
      })

 

 let data= useContext(storeCetagoriesContext); 
  return (
      <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
      </Helmet>
        <CetagorySlider onSendId={handleIdFromCat} data={data?.data?.data?.data} home={false}/>
        <SubCetagory  onSendId={handleIdFromSubCat}  data={dataSub?.data?.data?.data} />
        <div style={{paddingBottom:'60px'}} className="container">
       <div className="row g-2 g-sm-5">
        {displayProducts?.map((item)=>{
          return <Product key={item._id} item={item}/>

        }) }
       </div>
     </div>
      </>
    
  )
}

export default Categories