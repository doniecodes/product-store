import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Cart = () => {
  let items = JSON.parse(localStorage.getItem("items"));

    // Handle Delete
    const handleDelete = (id)=> {
     items = items.filter((x)=> {
      return x.id !== id })
  
    }

  const cartElements = items === null ? items : items.map((item)=> {
    const [qty, setQty] = useState(item.quantity);
    // Change Quantity
    const changeQty = (text)=> {
      if(text === "plus"){
        setQty(qty + 1);
      } else if(text === "minus" && qty > 1){
        setQty(qty - 1);
      }
    }

    return <li key={item.id} className="cart-item">
      <Link to={`/products/${item.id}`}>
      <img src={item.image} alt={item.title} className='cart-item-image' />
      </Link>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.title}</h4>
        <div className="cart-item-buttons">
          <p className="cart-item-price">
            ${item.price}
          </p>
          <div className="cart-item-qty-buttons">
              <button onClick={()=> changeQty("minus")}>-</button>
              <p className='cart-item-quantity'>{qty}</p>
              <button onClick={()=> changeQty("plus")}>+</button>
            </div>
        </div>
      </div>
      <button onClick={()=> handleDelete(item.id)} className="cart-item-delete">
        X
      </button>
    </li>
  });

  return (
    <>
    <section className="cart-items-section">
      <h1 className='heading-2'>Your Cart.</h1>
      <ul className="cart-items">
        {items !== null && cartElements}
      </ul>
    </section>
    </>
  )
}

export default Cart