"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const Generate = () => {

  const searchParams = useSearchParams()

  // const [link, setlink] = useState("")
  // const [linktext, setlinktext] = useState("")
  const [links, setLinks] = useState([{link: "",linktext: ""}])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks)=>{
      return initialLinks.map((item,i)=> {
        if (i==index){
          return {link, linktext}
        } else {
          return item
        }
      })
    })
  }

  const addLink = () => {
    setLinks(links.concat([{link: "", linktext: ""}]))
  }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic": pic,
      "desc":desc
    });

    console.log(raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const r = await fetch("http://localhost:3000/api/add", requestOptions);
      const result = await r.json();

      if(result.success){
        toast.success(result.message); 
        setLinks([{link: "", linktext: ""}])
        setpic("")
        sethandle("")

      }else{
        toast.error(result.message);   
      }
      console.log(result);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!"); // Optional: Show an error toast
    }
  };

  return (
  
    <div className="bg-[#D7A648] min-h-[120vh] grid grid-cols-2">
      <div className="col1 flex justify-center items-center flex-col text-gray-800 ">
      <ToastContainer /> 
        <div className="flex flex-col gap-5 my-8">
          <h1 className="font-bold  text-4xl top-20">Create your Link-Tree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim Your Handle
            </h2>
            <div className="mx-4">
              <input value={handle || ""}
                onChange={e=>{sethandle(e.target.value)}}
                className="px-4 py-2 my-2 focus:outline-yellow-400 rounded-full"
                type="text"
                placeholder="Choose a handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>
            
            { links && links.map((item, index)=>{
              return <div key={index} className="mx-4 gap-2">
              <input value={item.link || ""}
                onChange={e=>{handleChange(index, e.target.value, item.linktext)}}
                className="px-4 py-2 mx-2 my-2 focus:outline-yellow-400 rounded-full"
                type="text"
                placeholder="Enter link "
              />
              <input value={item.linktext || ""}
                onChange={e=>{handleChange(index, item.link, e.target.value,)}}
                className="mt-3 px-4 py-2 mx-2 my-2 focus:outline-yellow-400 rounded-full"
                type="text"
                placeholder="Enter link text"
              />
            </div>
            })
              }

              <button onClick={() => addLink()} className="px-5 py-2 mx-2 mt-2 bg-slate-900 text-white font-bold rounded-3xl">
               + Add Link
              </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add Picture and Description
            </h2>
            <div className="mx-4 flex flex-col">

              <input value={pic || ""}
                onChange={e=>{setpic(e.target.value)}}
                className="px-4 py-2 mx-2 my-2 focus:outline-yellow-400 rounded-full"
                type="text"
                placeholder="Add link to your picture"
                />
                <input value={desc || ""}
                onChange={e=>{setdesc(e.target.value)}}
                className="px-4 py-2 mx-2 my-2 focus:outline-yellow-400 rounded-full"
                type="text"
                placeholder="Enter Description"
                />
              <button disabled={pic =="" || handle == "" || links[0].linktext == ""} onClick={()=>{submitLinks()}} 
              className=" disabled:bg-slate-600 px-5 py-2 mx-2 w-fit my-5 bg-slate-900 transition-transform transform active:scale-95 text-white font-bold rounded-3xl">
                Create your linkTree
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full bg-[#D7A648]">
        <img
          className="h-[100vh]  object-cover "
          src="generate.png"
          alt="for generating ur links"
        />
      </div>
    </div>
  );
};
        

export default Generate;
