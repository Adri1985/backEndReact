import EErors from "../services/enums.js";

export default(error, req,res,next)=>{
    console.log(error.cause);
    switch(error.code){
        case EErors.INVALID_TYPES_ERROR:
        res.code(400).send({status:'error', error: error.name})
        break;
    default:
    }
    
}