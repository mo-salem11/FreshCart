import React, { useContext, useState } from 'react'
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { storeProductsContext } from '../../Contexts/StoreProductsContext';
import {Helmet} from "react-helmet";

function Products() {
  let {data,isLoading}= useContext(storeProductsContext);
  const [inputValue, setInputValue] = useState('');
  let [Data,setData]=useState(data?.data?.data);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const filteredProducts = data?.data?.data.filter(product => product.title.toLowerCase().includes(inputValue.toLowerCase()));
    setData(filteredProducts);
  };
  
 
 if(isLoading)return <Loading/>
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
      </Helmet>
     <div style={{paddingBottom:'60px'}} className="container">
     <input value={inputValue}
        onChange={handleInputChange} type="text" className='form-control bg-main-light w-75 mx-auto mb-5 mt-3' />
       <div className="row g-2 g-sm-5">
        {Data?.map((item)=>{
          return <Product key={item._id} item={item}/>

        }) }
       </div>
     </div>
    </>
  )
}

export default Products