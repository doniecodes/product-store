import React, { useState } from 'react'
import { getProducts } from '../data/api';
import { useLoaderData, Await, Link, useSearchParams } from 'react-router-dom'

export async function loader ({request}) {
  const productsPromise = new Promise((res)=> {
    setTimeout(()=> res(getProducts()), 0);
  })
  const actualProducts = await getProducts();
  return { productsPromise, actualProducts };
}

const Products = () => {
  const products  = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const productsElements = (items)=> {
    const itemsToShow = category === null ? items : items.filter((x)=> x.category === category); 

    const itemEls = itemsToShow.map((item)=> {
      return <Link to={`/products/${item.id}`}
       className="item" key={item.id}
       state={{search : searchParams !== null && searchParams.toString()}}>
        <div className="item-image-div">
          <img src={item.image} alt={item.name} className='item-image'/>
          <p className="item-price">${item.price}</p>
        </div>
        <div className="item-details">
          <h3 className="item-name">{item.title.split("").slice(0, 20)}...</h3>
          <p className="item-description">{item.description}</p>
        </div>
      </Link>
    })

    return (
      <>
      <div className="products">
        {itemEls}
      </div>
      </>
    )
  }

  // Handle Category Function
  const handleCategory = (text)=> {
    setSearchParams(prevParams => {
      if(text === "null"){
        prevParams.delete("category")
      } else {
        prevParams.set("category", text)
      }
      return prevParams;
    })
  }


  return (
    <>
    <section className="products-section">
      <div className="products-head">
      <h1 className="heading-1">Products</h1>
      <div className='products-filters'>
        <select name="" id="" onChange={(e)=> handleCategory(e.target.value)}>
          <option value="null">Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>
      </div>
    <React.Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={products.productsPromise}>
        {productsElements}
      </Await>
    </React.Suspense>
    </section>
    </>
  )
}

export default Products