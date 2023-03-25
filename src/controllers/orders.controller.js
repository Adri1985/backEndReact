import Order from '../DAO/mongo/orders.mongo.js'
import User from '../DAO/mongo/users.mongo.js'
import Store from '../DAO/mongo/stores.mongo.js'

const userService = new User()
const orderService = new Order()
const storeService = new Store()

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
    const {user: uid, store: sid, products}= req.body
    const user = await userService.getOneByID(uid)
    const store = await storeService.getOneByID(sid)
    
    //lista de los productos del Store
    const actualOrders = store.products.filter(product =>{
        product.include(product.id)
    })

    const sum = actualOrders.reduce((sum, product)=>{
        sum += product.price; return sum
    },0)

    const orderNumber = Date.now()+Math.floor(Math.random()*10000+1)
    const order = {
        number:orderNumber,
        store: sid,
        status:'PENDING',
        products: actualOrders.map(p=>p.id),
        totalPrice: sum
    }

    const result = await orderService.create(order)
    user.orders.push(result._id)
    await userService.updateUser(uid, user)
    res.json({status:succes, result:{result}})
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

