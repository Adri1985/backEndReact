import MessageModel from "../mongo/models/message.model.js"

export default class Message {
    constructor() {}

    get = async() => {
        return await MessageModel.find().lean().exec()
    }

    create = async(data) => {
        await MessageModel.create(data)
        return true
    }

}