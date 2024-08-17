import mongoose from "mongoose";

let isConnected:boolean = false

export const connectDB = async():Promise<void>=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('Mongoo is already Connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URL || '',{
            dbName:'Store_Admin'
        })
        isConnected= true
        console.log("Mongo is Connected")
    } catch (error) {
        console.log(error)
    }
}