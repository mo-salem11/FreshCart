import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands  from './Components/Brands/Brands';
import NotFound from './Components/NotFound/Notfound';
import { createHashRouter,RouterProvider } from 'react-router-dom';
import AuthLayout from './Components/AuthLayout/AuthLayout';
import Signup from './Components/SignUp/Signup';
import SignIn from './Components/SignIn/Signin';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { Offline,Online } from 'react-detect-offline';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { StoreCetagoriesContextProvider } from './Contexts/StoreCetegoriesContext';
import StoreBrandsContextProvider from './Contexts/StoreBrandsContext';
import { StoreProductsContextProvider } from './Contexts/StoreProductsContext';
import StoreCartContextProvider from './Contexts/StoreCartContext';
import { ToastContainer } from 'react-toastify';
import Address from './Components/Address/Address';
import StoreWishlistContextProvider from './Contexts/StoreWishlistContext';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
function App() {


  let routes= createHashRouter([
    {path:"",element:<Layout/>,children:[
      {index:true,element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"allorders",element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path:"shipping/:id",element:<ProtectedRoutes><Address/></ProtectedRoutes>},
      {path:"wishlist",element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"products/:id",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"*",element:<NotFound/>},
    ]},
    {path:"/",element:<AuthLayout/>,children:[
      {path:'signup',element:<Signup/>},
      {path:'signin',element:<SignIn/>},
      {path:'forget-password',element:<ForgetPassword/>},
      {path:'reset-password',element:<ResetPassword/>}
    ]},
   
  ])
  return (
    <>
   
    <Online>
      <StoreCetagoriesContextProvider>
        <StoreBrandsContextProvider>
          <StoreProductsContextProvider>
            <StoreCartContextProvider>
                <StoreWishlistContextProvider>
                      <RouterProvider router={routes}>
                        </RouterProvider>  
                </StoreWishlistContextProvider>
            </StoreCartContextProvider>
          
          </StoreProductsContextProvider>
        </StoreBrandsContextProvider> 
      </StoreCetagoriesContextProvider>
      <ToastContainer theme='colored' autoClose={500}/>
    </Online>
    <Offline>
       <div className="offline">
          You are offline Now!
       </div>
    </Offline>
    
    </>
    
  );
}

export default App;
