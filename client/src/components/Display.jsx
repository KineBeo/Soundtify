import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbums from './DisplayAlbums'
import { albumsData } from '../assets/assets'

const Display = () => {

    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    console.log(isAlbum);
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    const bgColorOfTheAlbum = albumsData[Number(albumId)].bgColor;
    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColorOfTheAlbum}, #121212)`
        } else {
            displayRef.current.style.background = `#121212`
        }
    })
    return (
        <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbums />} />
            </Routes>
        </div>
    )
}

export default Display