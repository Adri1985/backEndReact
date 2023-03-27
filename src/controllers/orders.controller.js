import Order from '../DAO/mongo/orders.mongo.js'
import User from '../DAO/mongo/users.mongo.js'
import Store from '../DAO/mongo/stores.mongo.js'
import Cart from '../DAO/mongo/stores.mongo.js'
import mongoose from 'mongoose'

const userService = new User()
const orderService = new Order()
const storeService = new Store()
const cartService = new Cart()

export const getOrders = async(req,res)=>{
    const result = await orderService.get()
    if (!result) return res.status(500).send({status:'error', error:'error getting orders'})
    res.json({status:succes, result:{result}})
}

export const getOrderByID = async(req,res)=>{
    const {oid} = req.params

    const result = await orderService.getOneByID(oid)
    if (!result) return res.status(500).send({status:'error', error:'error getting order'})
    
    res.json({status:succes, result:{result}})
}

export const createOrder = async(req,res)=>{
    console.log("body", req.body)

    // asi va a venir la orden del body
    // {"user":"641e3059fc08bcffaf3f7eea", 
    // "store":"641fcb0711da07bac4708d41", 
    // "products": [{"_id":"641dec1d396d5837a95ba21b","quantity":3,
    // "precio":100}]}
    const {user: uid, store: sid, products}= req.body
    const user = await userService.getOneByID(uid)
    const store = await storeService.getOneByID(sid)
    let suma = 0
    let finalorder =[]
    let storeProducts =[]

    console.log("store", store)
    console.log("user", user)
    console.log("products", products)

    for(let i = 0; i< products.length; i++){

        let productStore = store.products.find(prod=>
            prod.product.toString() == products[i]._id)
        console.log("productStore", productStore)
        console.log("product en for", mongoose.Types.ObjectId(products[i]._id))

        if(productStore){ // encontro el producto en stock
            if (productStore.quantity >= products[i].quantity){
                
                //hay stock
                productStore.quantity -= products[i].quantity
                suma += products[i].precio*products[i].quantity
                products[i].quantity = 0
                finalorder.push(products[i])

            }else{//no alcanza pero genera la orden con lo que hay
                suma += productStore.precio*productStore.quantity
                products[i].quantity -= productStore.quantity
                productStore.quantity =0 //queda sin stock
                finalorder.push(productStore)
            }
            
        }
        storeProducts.push(productStore)

    }

    store.products = storeProducts
    //lista de los productos del Store
    const orderNumber = Date.now()+Math.floor(Math.random()*10000+1)
    const order = {
        number:orderNumber,
        store: sid,
        status:'PENDING',
        products: finalorder,
        totalPrice: suma
    }

    const result = await orderService.create(order)
    user.orders.push(result._id)
    await userService.updateUser(uid, user)

    await storeService.updateStore(store._id, store)
   



    res.json({status:'succes', result:{products}})// devuelve un objeto con la estructura del carrito con lo que no tuvo stock
}

export const resolveOrder = async(req,res)=>{
    const {resolve} = req.query
    const {oid} = req.params
    const order = await orderService.getOneByID(oid)
    order.status = resolve
    const result = await orderService.updateOne(order._id, order)

    res.send({status:succes, result:{}})
    res.json({status:succes, result:{result}})
}

