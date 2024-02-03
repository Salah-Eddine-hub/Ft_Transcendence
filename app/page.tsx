"use client";
import Chat from "./image/chat";
import Game from "./image/game";
import Logout from "./image/logout";
import Profil from "./image/profil";
import PongGame from "./components/PongGame";

export default function Home() {

  return (
  

    <main className='bg-black w-full min-h-screen flex'>
      <nav className="bg-slate-500 bg-opacity-90 flex items-center justify-between flex-col px-5 ">
        <div>
          <h3 className="text-white pt-5">logo</h3>
        </div>
        <div className="flex flex-col  gap-10">
          <Profil/>
          <Chat/>
          <Game/ >
        </div>
        <div className="pb-5"><Logout/></div>
      </nav>
      <div  className="bg">
      {/* <img src="/image/background.png" className="min-h-screen"  alt="easybanklogo" /> */}
            <div className="flex justify-around items-center flex-raw pt-10">
                  <span className="bg-slate-500 w-20 h-20 rounded-full  "></span>
                  <span className="bg-slate-500 w-20 h-20 rounded-full "></span>
            </div>
            <div className="flex justify-around items-center flex-raw py-5">
              <span className="text-white">sanji</span>
              <span className="text-white">AI</span>
            </div>
            <div className="flex justify-center " >
              
              <PongGame/>
              
            </div>
      </div>
    </main>
  )
}

