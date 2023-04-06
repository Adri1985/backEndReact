import EErors from "../services/enums.js";

export default(error, req,res,next)=>{
    
    switch(error.code){
        case EErors.INVALID_TYPES_ERROR:
        res.status(400).send({status:'error', error: error.name})
        break;
    default:
    }
    
}