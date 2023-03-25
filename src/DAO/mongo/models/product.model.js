import mongoose from "mongoose"

import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({

    
            marca : String,
            modelo : String,
            tipo: String,
            rango: Number,
            precio : Number,
            topFeature1 : String,
            topFeature2 : String,
            topFeature3 : String,
            imageName: String,
            liked: String,
            stock : Number,
            onCart: Number
})

productSchema.plugin(mongoosePaginate)
const ProductModel = mongoose.model(productCollection, productSchema)

export default ProductModel