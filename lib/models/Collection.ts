import mongoose from 'mongoose'

const collectionSchema = new mongoose.Schema({
    title:{ type: String, required:true, unique:true},
    description:{type:String},
    image:{type:String, required:true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createAt:{type:Date, default:Date.now},
    updateAt:{type:Date, default:Date.now}
})

const Collection = mongoose.models.Collection || mongoose.model('Collection',collectionSchema)

export default Collection