import StoreModel from "./models/stores.model";

export default class Store {
    constructor() {}

    get = async() => {
        return await StoreModel.find().lean().exec()
    }

    create = async(data) => {
        await StoreModel.create(data)
        return true
    }

    getOneByID = async(id) => {
        return await StoreModel.findOne({_id:id}).lean().exec()
    }

    updateStore = async(id, store)=>{
        const result = await StoreModel.updateOne({_id, id}, {$set: store})
        return result

    }

}