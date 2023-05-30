import CartModel from '../mongo/models/cart.model.js'
import mongoose from 'mongoose'

export default class Cart{
    constructor(){
    }
    getAll = async()=>{
        const result = await CartModel.find().lean().exec()
        return result
    }

    createOne = async()=>{
        
        const result = await CartModel.create({products:[]})
        
        return result
    }

    updateOne = async(id, updCart)=>{
        const result = await CartModel.updateOne({_id:id}, updCart)
        return result
    }

    addProductToCart = async(cartID, productID,qty)=>{
        const mongooseCartID = mongoose.Types.ObjectId(cartID)
        const mongooseProductID = mongoose.Types.ObjectId(productID)
        const cart = await this.getOne(cartID)
        cart.products.push({product: mongooseProductID, quantity: qti||1})
        const result = this.updateOne({_id:mongooseCartID}, cart)
        return result
    }

    getOne = async(id)=>{
        
        const mongooseCartID = mongoose.Types.ObjectId(id)
        const result = await CartModel.findOne({_id: mongooseCartID}).lean().exec()
        return result
    }
    getOnePopulate = async(id)=>{
        const mongooseCartID = mongoose.Types.ObjectId(id)
        const result = await CartModel.findOne({_id: mongooseCartID}).populate('products.product').lean().exec()
        return result
    }

    deleteOne = async(id)=>{
        const result = await CartModel.deleteOne({_id:id})
        return result
    }

}

