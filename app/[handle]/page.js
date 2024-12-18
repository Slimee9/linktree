import Link from "next/link"
import clientPromise from "@/lib/mongoDb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle

    const client = await clientPromise;
    const db = client.db("linkTree")
    const collection = db.collection("links")

    //IF the handle is already claimed , linktree can't be created
    const item = await collection.findOne({handle: handle})
    if(!item){
      return notFound() 
    }
    console.log(item)

    const item2 = {
        "_id": {
          "$oid": "676013a238811f1e03b3e5b8"
        },
        "handle": handle,
        "links": [
          {
            "link": "github",
            "linktext": "https://github.com/Slimee9"
          },
          {
            "link": "instagram",
            "linktext": "https://instagram.com/"
          },
          {
            "link": "X",
            "linktext": "https://x.com/Slimee9"
          },
          {
            "link": "Facebook",
            "linktext": "https://facebook.com"
          }
        ],
        "pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiX_E-qjEsqCfPGtR7dFZlPJtVqnD_EOGVw&s"
      }

    return<div className="flex flex-col min-h-screen bg-slate-900 justify-start py-10 items-center gap-4">
         <div className="photo  rounded-full overflow-hidden w-44 h-44 border border-1 border-slate-600">
            <img className="w-full h-full rounded-full object-cover "
                src={item.pic}
                alt="Profile Pic"/>
        </div>
            <span className="font-bold text-blue-100">@<span className="text-xl underline">{item.handle}</span></span>
            <span className="desc w-90 text-center font-semibold  font-serif text-slate-400">{item.desc}</span>
            <div className="links text-white">
                {item.links.map((item,index)=>{
                    return  <div key={index}  className="" >
                              <Link 
                              className=" py-4 px-2  my-3 flex justify-center font-semibold uppercase hover:underline min-w-96
                                         bg-slate-600 rounded-md shadow-lg active:scale-95 hover:text-blue-700  " 
                                         href={item.linktext} >{item.link} 
                                         </Link>  
                            </div>   
                })}
            </div>
         </div>
}