import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongooseDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req:NextRequest,{params}:{params:{productId: string}}) =>{
    try {
        await connectDB()
        const data = await Product.findById(params.productId).populate({path:'collections',model: Collection})
        if(!data){
            return new NextResponse(JSON.stringify({message: "Product not found"}),{status:404})
        }

        return NextResponse.json(data,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error",{status:500})
    }
}

export const POST = async(req: NextRequest,{params} : {params:{productId:string}})=>{
    try {
        console.log('dsa',params)
        const {userId} = auth()
        if(!userId){
            return new NextResponse('Unauthorized',{status:401})
        }   
        await connectDB()

        let product = await Product.findById(params.productId)

        if(!product){
            return new NextResponse('Product not found',{status:404})
        }
        const {title,description,media,category,collections,tags,sizes,colors,price,expense } = await req.json()

        if(!title || !media){
            return new NextResponse('Title and image are required',{status:400})
        }

        product = await Product.findByIdAndUpdate(params.productId,{title,description,media,category,collections,tags,sizes,colors,price,expense},{new:true})

        await product.save()

        return NextResponse.json(product,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error" , {status: 500})
    }
}

export const DELETE = async(req:NextRequest, {params}: {params:{productId: string}})=>{
 try {
    const {userId} = auth()
    if(!userId){
        return new NextResponse("Unauthorized",{status:403})
    }

    await connectDB()
    await Product.findByIdAndDelete(params.productId)
    return new NextResponse("Product is deleted",{status:200})
 } catch (error) {
    console.log(error)
    return new NextResponse("Internal error",{status:500})
 }
}