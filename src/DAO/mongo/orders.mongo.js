import OrderModel from "./models/order.model.js";

export default class Order {
    constructor() {}

    get = async() => {
        return await OrderModel.find().lean().exec()
    }

    create = async(data) => {
        return await OrderModel.create(data)
    }

    getOneByID = async(id) => {
        return await OrderModel.findOne({_id:id}).lean().exec()
    }

    updateOne = async(id, order) =>{
        return await OrderModel.updateOne({_id: id},{$set:order})
    }

  

}