import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className='max-w-2xl mx-auto'>
      <Navbar />
      <main className='min-h-screen px-6 mt-8'>
        <Outlet />
      </main>
      </div>
    )
}

export default Layout