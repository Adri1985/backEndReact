
import {CartService} from '../repository/index.js'

class CartManager{
    constructor()
    {
        this.cartService = CartService
    }

    getAll = async() =>{
        const carts = await this.cartService.get()
        return carts
     }
    
    createOne = async() =>{
        console.log("manager")
        const result = await this.cartService.createOne()
        return result
        }   
    
    updateOne =async(id, updCart)=>{
        const result = await this.cartService.updateOne(id, updCart)
    }

    addProductToCart = async( cartID, productID, qty) =>{
        console.log("product id ", productID)
        console.log("cartID", cartID)
        const cart = await this.getOne(cartID)
        console.log("cart en manager", cart)
        cart.products.push({product: productID, quantity: qty||1})
        console.log("cart en manager", cart)
        const result = await this.cartService.updateOne({_id: cartID}, cart)
        return (result)
    }   
 
    getOne = async(id) => {
        console.log("manager", id)
        const result = await this.cartService.getOne(id) 
        return result
    }

    deleteProdFromCart= async(cartID, productID) =>{
        const newCart = this.getOne(cartID)
        if (newCart == undefined){
            return({error:`Cart ${cartID} not found`, payload:{}})
        }
        else{
            const cartProductsFiltered = newCart.products.filter(prod => prod.product != productID)
            newCart.products=cartProductsFiltered
            const result = await this.updateOne(cartID, newCart)
            return result
        }
    }

    updateProductsOnCart = async(cid, products) => {
        const cartFound = await this.getOne(cid)
        cartFound.products = products
        const result = await this.updateOne(cid, cartFound)
        return result
    }

    updateProductQuantity= async(cid, pid, quantity)=>{
        let cartFound = await this.getOne(id)
        for (let i = 0; i< cartFound.products.length; i++){
            if(cartFound.products[i].product == pid){
                cartFound.products[i].quantity = quantity
            }
        }    
        const result = await this.updateOne(cid, cartFound)
        return result
    }

    deleteProductsFromCart = async(cid) =>{
        let cartFound = await this.getOne(cid)
        cartFound.products = []
        let result = this.updateOne(cid,cartFound)
        return result
    } 

    deleteOne = async(cid)=>{
        let cartFound = await this.getOne(cid)
        cartFound.products=[]
        const result = this.cartService.updateOne(cid, cartFound)
        return result
    }
   
}
export default CartManager

