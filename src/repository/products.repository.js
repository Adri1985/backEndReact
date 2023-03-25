import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    getPaginate = async(search, options) => {
        return await this.dao.getPaginate(search, options)
    }

    getOne = async(id)=>{
        return await this.dao.getOne(id)
    }

    updateOne = async(id, updProduct)=>{
        return await this.dao.updateOne(id, updProduct)
    }


    createOne = async(data) => {
        const dataToInsert = new ProductDTO(data)

        return await this.dao.createOne(dataToInsert)
    }
    deleteOne = async(id)=>{
        return await this.dao.deleteOne(id)
    }
}