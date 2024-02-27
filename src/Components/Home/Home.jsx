import React, { useContext } from 'react'
import Mainslider from '../Mainslider/Mainslider'
import { storeCetagoriesContext } from '../../Contexts/StoreCetegoriesContext';
import CetagorySlider from '../CetagorySlider/CetagorySlider';
import BrandsSlider from '../BrandsSlider/BrandsSlider';
import { storeContextBrand } from '../../Contexts/StoreBrandsContext';
import Loading from '../Loading/Loading';
import { storeProductsContext } from '../../Contexts/StoreProductsContext';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { Helmet } from 'react-helmet';
function Home() {
  let {data,isLoading}= useContext(storeCetagoriesContext);
  let dataBrands=useContext(storeContextBrand);
  let dataProducts=useContext(storeProductsContext);

  




  if(isLoading)return <Loading/>
  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
      </Helmet>
      <Mainslider/>
      <div style={{paddingBlock:"80px",backgroundColor:"#F7F7FA"}} className='container-fluid px-3'>
          <div  className='d-flex gap-2 align-items-center'>
              <h2 className='fw-bolder text-main'>All Categories</h2>
              <div style={{marginTop:"-8px"}} className="position-relative flex-grow-1">
                 <span style={{width:"1.5rem",height:"1px",transform:"rotate(-45deg)",marginTop:"8px"}} className='position-absolute top-0  bg-main'></span>
                <span style={{height:"1px",width:'calc(100% - 20px)'}} className='straight position-absolute end-0 bg-main'></span>
              </div>
          </div>
          <CetagorySlider data={data?.data?.data} home={true}/>
          
          <div style={{paddingTop:"80px"}} className='d-flex gap-2 align-items-center'>
              <h2 className='fw-bolder text-main'>Top Brands</h2>
              <div style={{marginTop:"-8px"}} className="position-relative flex-grow-1">
                 <span style={{width:"1.5rem",height:"1px",transform:"rotate(-45deg)",marginTop:"8px"}} className='position-absolute top-0  bg-main'></span>
                <span style={{height:"1px",width:'calc(100% - 20px)'}} className='straight position-absolute end-0 bg-main'></span>
              </div>
          </div>
          <BrandsSlider data={dataBrands?.data?.data?.data}/>

          <div style={{paddingTop:"80px"}} className='d-flex  gap-2 align-items-center'>
              <h2 className='fw-bolder text-main'>Recommended for you</h2>
              <div style={{marginTop:"-8px"}} className="position-relative flex-grow-1">
                 <span style={{width:"1.5rem",height:"1px",transform:"rotate(-45deg)",marginTop:"8px"}} className='position-absolute top-0  bg-main'></span>
                <span style={{height:"1px",width:'calc(100% - 20px)'}} className='straight position-absolute end-0 bg-main'></span>
              </div>
           </div>   
              <ProductsSlider data={dataProducts.data?.data?.data?.slice(0,10)}/>             
        </div>
      
         
       
    </div>
  )
}

export default Home