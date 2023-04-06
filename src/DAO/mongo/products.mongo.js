import ProductModel from '../mongo/models/product.model.js'
//ESTE ES EL DAO
export default class Product {
    constructor (){
        
    }

    get = async() => {
        return await ProductModel.find().lean().exec()
    }

    getPaginate =async(search, options)=>{
        return ProductModel.paginate(search, options)
    }

    getOne=async(id)=>{
       const productFound = await ProductModel.findOne({_id:id}).lean().exec()
       return productFound
    }

    updateOne=async(id, updProduct)=>{
        const result = await ProductModel.updateOne({_id:id}, updProduct)
        return result
    }

    createOne = async(product) =>{
        
        const result = await ProductModel.create(product)
        return result
    }

    deleteOne = async(id)=>{
        const result = await ProductModel.deleteOne({_id: id})
        return result
    }
    
}
