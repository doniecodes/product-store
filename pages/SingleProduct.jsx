import React, { useState } from 'react'
import { getProducts } from '../data/api'
import { useLoaderData, Await, Link, useLocation } from 'react-router-dom';

export async function loader ({params}) {
  const productPromise = new Promise((res)=> {
    setTimeout(()=> res(getProducts(params.id)))
  })
  const actualProduct = await getProducts(params.id);
  return { productPromise, actualProduct };
}

// Component Function
const SingleProduct = () => {
  const product = useLoaderData();
  const location = useLocation();
  const [ quantity, setQuantity ] = useState(0);
  const sizes = product.actualProduct.category !== "electronics";
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  const productElements = (item)=> {
    const desc = item.description.length > 350 ? item.description.slice(0, 350)+"..." : item.description
    return (
      <>
        <div className="single-item">
          <div className="single-item-image-div">
            <img src={item.image} alt={item.name} className='single-item-image'/>
          </div>
          <div className="single-item-details">
            <h3 className="single-item-name">{item.title}</h3>
            <p className="single-item-price">${item.price}</p>
            <p className="single-item-description">{desc}</p>
            { sizes ?
            <div className="single-item-sizes">
              <span>XS</span>
              <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
              <span>XXL</span>
            </div> : null
            }
            <div className="single-item-buttons">
              <button onClick={()=> handleQuantity("minus")}>-</button>
              <p className='quantity'>{quantity}</p>
              <button onClick={()=> handleQuantity("plus")}>+</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Handle Quantity Change 
  const handleQuantity = (text)=> {
    const newitem = {...product.actualProduct, quantity}
    if(text === "minus" && quantity > 0){
      setQuantity(quantity - 1)
    } else if(text === "plus" && quantity < 6){
      setQuantity(quantity + 1)
    }
    setLocalItems(prev=> {
      if(!prev.includes(newitem)){
        return [...prev, newitem];
      } else {
        return {...newitem, quantity}
      } 
    })
  }
  // Local storage
  localStorage.setItem("items", JSON.stringify(localItems))

  // Link state to go to previous url path 
  const search = location.state ? location.state.search : "";
  const btnText = decodeURIComponent(search.split("=")[1])

  return (
    <>
    <section className="product-section">
      <Link to={`..?${search}`} relative="path" 
      className="back-btn" title={`Back to ${btnText}`} >&larr; Back</Link>
      {/* <h1 className='heading-2'>Product Details</h1> */}
    <div className="single-items">
    <React.Suspense>
      <Await resolve={product.productPromise}>
        {productElements}
      </Await>
    </React.Suspense>
    </div>
    </section>
    </>
  )
}

export default SingleProduct