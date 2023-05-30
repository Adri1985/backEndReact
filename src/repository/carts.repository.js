import CartDTO from '../DAO/DTO/carts.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.getAll()
    }

 
    getOne = async(id)=>{
        
        return await this.dao.getOne(id)
    }

    getOnePopulate = async(id)=>{
        
        return await this.dao.getOnePopulate(id)
    }

    updateOne = async(id, updCart)=>{
        return await this.dao.updateOne(id, updCart)
    }


    createOne = async() => {
        
        const dataToInsert = new CartDTO()

        return await this.dao.createOne()
    }
    deleteOne = async(id)=>{
        return await this.dao.deleteOne(id)
    }

    addProductToCart = async(cartID, productID, qty)=>{
        return await this.dao.addProductToCart(cartID, productID, qty)
    }
}