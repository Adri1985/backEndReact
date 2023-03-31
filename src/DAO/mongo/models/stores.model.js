import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
        ],
        default: []
    },
})

const StoreModel = mongoose.model('Stores', schema)

export default StoreModel


