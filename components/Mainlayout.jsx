import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <>
    <Header />
    <div className="flex-wrapper">
    <div className="container">
    <Outlet />
    </div>
    <Footer />
    </div>
    </>
  )
}

export default Mainlayout