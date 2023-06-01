import UserModel from "../mongo/models/user.model.js"
import CartModel from "../mongo/models/cart.model.js"
import StoreModel from "../mongo/models/cart.model.js"

export default class User {
    constructor() {}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    create = async(data) => {
        const cart = await CartModel.create({products:[]})
        data.cart = cart._id
        
        await UserModel.create(data)
        return true
    }

    getOneByID = async(id) => {
        return await UserModel.findById(id).lean().exec()
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }

    updateUser = async(id, updOrders)=>{
        console.log("id", id)
        console.log("orders", updOrders)
        const result = await UserModel.updateOne({_id: id}, {$set: {orders:updOrders}})
        console.log("result", result)
        return result

    }
}