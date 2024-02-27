import React, { useState } from 'react'
import BrandsSlider from '../BrandsSlider/BrandsSlider'
import { useContext } from 'react';
import {storeProductsContext} from '../../Contexts/StoreProductsContext';
import { storeContextBrand } from '../../Contexts/StoreBrandsContext';
import Product from '../Product/Product';
import { Helmet } from 'react-helmet';
function Brands() {
  let dataProducts= useContext(storeProductsContext);
  let dataBrands=useContext(storeContextBrand);
  
  let [displayProducts,setProducts]=useState(dataProducts.data?.data?.data);
  function handleIdFromBrand(id){
    const filteredSubProducts = dataProducts.data?.data?.data?.filter(product => product.brand._id === id.productId);
    setProducts(filteredSubProducts);
  }

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
      </Helmet>
     <BrandsSlider onSendId={handleIdFromBrand} data={dataBrands.data?.data?.data}/>
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

export default Brands