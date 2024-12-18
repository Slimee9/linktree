"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function Home() {

  
  const router = useRouter()
  const [text, setText] = useState("")
  
  const createTree = () => {

    router.push(`/Generate?handle=${text}`)
  }


  return (
    <main>
      <section className="bg-[#254f1a] min-h-[110vh] grid grid-cols-2">
        <div className=" flex  flex-col  justify-center ml-[10vw] gap-3 mt-32">
            <p className="text-yellow-300 font-bold text-7xl">
             Everything you</p>
             <p className="text-yellow-300  font-bold text-7xl">
             are. In one, </p>
             <p className="text-yellow-300 font-bold text-7xl">
             simple link in bio.
            </p>
            <p className="text-yellow-300 text-xl my-8">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>

            <div className="input flex gap-2">
              <input value={text} onChange={(e)=> setText(e.target.value)} type="text" placeholder="Enter your Handle " className="rounded-xl p-3 focus:outline-green-900"/>
              <button onClick={()=> createTree()} className="rounded-full p-4 text-lg bg-pink-200 text-slate-800 font-semibold">Claim your LinkTree</button>
            </div>
        </div>
        <div className=" flex flex-col items-center justify-center mr-[10vw] ">
            <img className="mt-5 p-10" src="/1.png" alt="home page img" />
        </div>
      </section>
      <section className="bg-[#7A0019] min-h-[100vh]">
        <div className="grid grid-cols-2 p-7">
          <div className=" flex flex-col items-center justify-center mt-32 ">
            <img className="mt-5 p-10" src="/2.png" alt="home page img" />
          </div>
          <div className=" flex  flex-col  justify-center mr-[10vw] gap-3 mt-40">
            <p className="text-gray-900 font-bold text-7xl">
              Create and customize,
            </p>
            <p className="text-gray-900  font-bold text-7xl">
               your Linktree in minutes </p>
            <p className="text-white text-xl my-4">
              Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.   </p>
            <div className="input flex gap-2 ">
              <button onClick={()=> createTree()} className="w-full rounded-full p-4 text-lg bg-black text-blue-100 font-semibold">Get started for free</button>
            </div>
        </div>
        </div>
      </section>
    </main>
  );
}
