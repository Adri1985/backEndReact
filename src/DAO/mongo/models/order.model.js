import mongoose from "mongoose";

const schema = new monggose.Schema({
    number: Number,
    store:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Stores'
    },
    products: [],
    status: String,
    totalPrice: Number
})

const StoreModel = mongoose.model('Orders', schema)

export default StoreModel