import {MessageService} from "../repository/index.js";

class MessageManager{
    constructor(){
        this.messageService = MessageService
    }
    addMsg = async(message)=>{
        const result = await this.messageService.create(message)
        
    }

}


export default MessageManager