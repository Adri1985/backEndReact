import UserModel from "../mongo/models/user.model.js"
import CartModel from "../mongo/models/cart.model.js"

export default class User {
    constructor() {}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    create = async(data) => {
        const cart = await CartModel.create({products:[]})
        data.cart = cart._id
        console.log("Data user y cart", data)
        await UserModel.create(data)
        return true
    }

    getOneByID = async(id) => {
        return await UserModel.findById(id).lean().exec()
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }

    updateUser = async(id, User)=>{
        const result = await StoreModel.updateOne({_id, id}, {$set: store})
        return result

    }
}