import React from 'react'
import { Routes, Route } from 'react-router-dom' // Import the 'Route' component
import {Home} from './Home' // Import the 'Home' component
const Mainpage = () => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            {/* <Routes>
                <Route path='/' element={<Home />} />
            </Routes> */}
        </div>
    )
}

export default Mainpage