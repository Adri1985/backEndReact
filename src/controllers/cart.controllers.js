import CartManager from '../manager/cart.manager.js'



const cartManager = new CartManager()

export const getAll= async(req,res)=>{
    const result = await cartManager.getAll()
    res.json(result)
}
export const getOne= async(req,res)=>{
    
    const cid = req.params.id
    
    const result = await cartManager.getOne(cid)
    res.json(result)
}

export const getOnePopulate= async(req,res)=>{
    
    const cid = req.params.id
    
    const result = await cartManager.getOnePopulate(cid)
    res.json(result)
}

export const createOne=async(req,res)=>{
    
    const result = await cartManager.createOne()
    res.json(result)
}

export const updateOne= async(req,res)=>{
    const cid = req.params?.id
    const updCart = req.body
    updCart.user = req.user.id
    const result = await cartManager.updateOne(cid, updCart)
    res.json(result)
}

export const addProductToCart = async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = parseInt(req.body.quantity)
    const result = await cartManager.addProductToCart(cid, pid, quantity)
    res.json(result)
}

export const deleteProductFromCart = async(req,res)=>{
    console.log("delete product from cart")
    const cid = req.params.cid
    const pid = req.params.pid
    console.log(`CID ${cid} PID ${pid}`)
    const result = await cartManager.deleteProdFromCart(cid, pid)
    res.json(result)
}

export const updateProductsOnCart = async(req,res)=>{
    const cid = req.params.cid
    const products = req.body
    const result = await cartManager.updateProductsOnCart(cid, products)
    res.json(result)
}

export const updateProductQuantity = async(req,res)=>{
    const quantityObj = req.body
    const pid =req.params?.pid
    const cid = req.params?.cid
    const result = await cartManager.updateProductQuantity(cid, pid, quantityObj)
    res.json(result)
}

export const deleteOne = async(req,res)=>{
    const cid = req.params?.cid
    const result = await cartManager.deleteOne(cid)
    res.json(result)
}