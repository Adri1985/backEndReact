
import {ProductService} from '../repository/index.js'

import querystring from 'querystring'


class ProductManager{
    constructor()
    {

    }
    setProducts =(products)=>{
        this.products = products
    }
        // constructor por parametros
    addProduct = async( product) =>{
        const result = await ProductService.create(product)
        return (result)
    }   
    // constructor por objeto Product
    validateProduct = (product) =>{
        console.log("product ", product)
        const {id, marca, modelo, tipo, rango, topFeature1, topFeature2, topFeature3, imageName, liked, stock, onCart} = product
        //return (id&& marca&& modelo&& tipo&& rango&& topFeature1&& topFeature2&& topFeature3&& imageName&& liked&& stock&& onCart)
        return true
    }

    createOne = async( product) =>{   // DEJO LAS VALIDACIONES QUE EXISTIAN
        if(this.validateProduct(product)){
            const result = await ProductService.createOne(product)
            return result
        }
        else{
            console.log("all fields are mandatory, product not added")
            return({})
        }
    }  
    s
  
    deleteOne= async(id) =>{
        const result = await ProductService.deleteOne(id)
        return (result)
    }   

    getAll = async(query) =>{
        const {limit, page, orden, filter}= query
        const options = {limit:10,page: 1, lean:true, sort:{price:1}}
        const filterObj = JSON.parse(JSON.stringify(querystring.parse(query.filter))) 
        const productsPaginated = await ProductService.getPaginate(filterObj, options )
        return(productsPaginated.docs)
        
    }
    getOne = async(id) => {
        const result = await ProductService.getOne(id)
        return result
    }
    updateOne = async(id, updProduct)=>{
        return ProductService.updateOne(id, updProduct)
    }

}
export default ProductManager

