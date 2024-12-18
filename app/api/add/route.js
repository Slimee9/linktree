import clientPromise from "@/lib/mongoDb"


export async function POST(request) {
    const body= await request.json()

    const client = await clientPromise;
    const db = client.db("linkTree")
    const collection = db.collection("links")

    //IF the handle is already claimed , linktree can't be created
    const doc = await collection.findOne({handle: body.handle})
    
    if(doc){
    return Response.json({  success: false, error: true, message: "LinkTree already exists! ", result:null})
    }

    const result = await collection.insertOne(body)

    console.log(body)
    return Response.json({  success: true, error: false, message: 'Your LinkTree has been generated ', result:result})
}