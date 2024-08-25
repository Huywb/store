import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongooseDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req:NextRequest)=>{
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }     

        await connectDB()

        const {title,description,media,category,collections,tags,sizes,colors,price,expense } = await req.json()

        if(!title|| !description || !media ||!category ||!price||!expense){
            return new NextResponse("Not enough data to create a product",{status:400})
        }

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense
        })

        await newProduct.save()

        return NextResponse.json(newProduct,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error",{status:500})
    }
}