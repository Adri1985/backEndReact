import {MessageService} from "../repository/index.js";

class MessageManager{
    constructor(){
        this.messageService = MessageService
    }
    addMsg = async(message)=>{
        const result = await this.messageService.create(message)
        console.log("result del chat", result)
    }

}


export default MessageManager