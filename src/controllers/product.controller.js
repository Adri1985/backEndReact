import CustomError from '../services/custom_error.js';
import EErors from '../services/enums.js';
import {generateProductErrorInfo} from '../services/info.js';

import ProductManager from '../manager/product.manager.js'

const productManager = new ProductManager(); 

export const getAll =async(req,res) =>{
    
    const result =await productManager.getAll(req.query)
    
    const payload ={products:result, user:req.user}
    
    
    res.json(payload)
}

export const getOne = async(req,res)=>{
    const id = req.params?.id;
    const result = await(productManager.getOne(id))
    res.json(result)
}

export const createOne = async(req,res) =>{
    const product = req.body.formData
    
    if(!product.modelo){
        CustomError.createError({
            name:"Product creation error",
            cause: generateproductErrorInfo({product}),
            message: "Error trying to create product",
            code: EErors.INVALID_TYPES_ERROR
        })
    }
    const result = await productManager.createOne(product)
    res.json(result)
}

export const updateOne= async(req,res)=>{
    const id = req.params.id
    const dataUPD = req.body
    const result = await productManager.updateOne(id, dataUPD)
    res.json({status:"success", result})
}

export const deleteOne = async(req,res) =>{
    const id = req.params.id
    const result = await productManager.deleteOne(id)
    res.json({status:"success", payload: result})
} 
