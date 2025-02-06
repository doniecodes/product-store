import React from 'react'
import { Route,
   createRoutesFromElements,
   createBrowserRouter,
  RouterProvider } from "react-router-dom"
import Mainlayout from '../components/Mainlayout'
import Home from '../pages/Home'
import Products, { loader as productsLoader } from '../pages/Products'
import SingleProduct, { loader as productLoader } from '../pages/SingleProduct'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import NotFoundPage from '../pages/NotFoundPage'


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="products"
        element={<Products />}
        loader={productsLoader} />
        <Route path="products/:id" element={<SingleProduct />}
        loader={productLoader} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        

        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    )
  )

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App