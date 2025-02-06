import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className="header">
        {/* <img src="" alt="" /> */}
        <p className='logo'>Logo</p>
        <nav className="nav">
            <ul className='nav-list'>
                <li className='list-li'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="products">Products</NavLink>
                    <NavLink to="cart">Cart</NavLink>
                    <NavLink to="checkout">Checkout</NavLink>
                </li>
                <li className='account-li'>
                    <NavLink className="signup-link" to="checkout">Signup</NavLink>
                </li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Header