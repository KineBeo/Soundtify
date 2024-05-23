import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; // Replace the import statement with the correct relative path to the Sidebar component file
import MusicPlayer from './components/MusicPlayer'; // Replace the import statement with the correct relative path to the MusicPlayer component file
import Display from './components/Display';
import { MusicPlayerContext } from './context/MusicPlayerContext';
import Authentication from './components/Authentication';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import DisplayAlbums from './components/DisplayAlbums';
const App = () => {

  const { audioRef, track } = useContext(MusicPlayerContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // new state
  useEffect(() => {
    // Check if the user is logged in when the app loads
    // This could be done by checking for a valid JWT in localStorage, for example
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Authentication />} />
        {/* <Route path='/home/album/:id' element={<DisplayAlbums />} /> */}
        <Route path='/home*' element={
          <>
            <div className='h-screen bg-black'>
              <div className='h-[90%] flex'>
                <Sidebar />
                <Display />
              </div>
              <div>
                <MusicPlayer />
                <audio ref={audioRef} src={track.file} preload='auto'></audio>
              </div>
            </div>
            <audio ref={audioRef} src={track.file} preload='auto'></audio>
          </>} />
      </Routes>
    </div>
  )
}

export default App