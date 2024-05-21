import Mainpage from "./assets /components/Mainpage"
import MusicPlayer from "./assets /components/MusicPlayer"
import { Sidebar } from "./assets /components/Sidebar"
import React from "react"
export default function App() {
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        {/* <Sidebar />
        <Mainpage /> */}
        <h1 className="font-semibold">App</h1>
      </div>
      <MusicPlayer />
    </div>
  )
}                                                                                                                                                                                                                                                                                   