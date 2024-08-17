import Collection from "@/lib/models/Collection";
import { connectDB } from "@/lib/mongooseDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:403})
        }

        await connectDB()
        const {title, description, image} = await req.json()

        const isExiting = await Collection.findOne({title})
        if(isExiting){
            return new NextResponse("Collection is already exist",{status:400})
        }
        if(!title|| !image){
            return new NextResponse("Title and Image are required",{status:400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        })

        await newCollection.save()

        return NextResponse.json(newCollection,{status:200})

    } catch (error) {
        console.log('POST collection',error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}

export const GET = async(req:NextRequest)=>{
    try {
        await connectDB()
        const collections = await Collection.find().sort({createAt: 'desc'})
        return NextResponse.json(collections,{status:200})
    } catch (error) {
        console.log("COLLECTION GET",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}