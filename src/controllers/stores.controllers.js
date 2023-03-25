import Store from '../DAO/mongo/stores.mongo.js'

const storeService = new Store()

export const getStores = async(req,res)=>{
    const result = await storeService.get()
    if (!result) return res.status(500).send({status:'error', error:'error getting stores'})
    res.json({status:succes, result:{result}})
}

export const getStoreByID = async(req,res)=>{
    const {sid} = req.params

    const result = await storeService.getOneByID(sid)
    if (!result) return res.status(500).send({status:'error', error:'error getting store'})
    
    res.json({status:succes, result:{result}})
}

export const createStore = async(req,res)=>{
    const store = req.body
    const result = await storeService.create(store)
    if (!result) return res.status(500).send({status:'error', error:'error creating store'})
    res.send({status:succes, result:{}})
}

export const addProduct = async(req,res)=>{
    const product = req.body
    const {sid} = req.params
    const store = await storeService.getOneByID(sid)
    store.products.push(product)
    const result = await storeService.updateStore(sid, store)
    res.send({status:succes, result:{}})
}

