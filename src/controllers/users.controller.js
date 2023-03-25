import User from '../DAO/mongo/users.mongo.js'

const userService = new User()

export const getUsers = async(req,res)=>{
    const result = await userService.get() 
    if (!result) return res.status(500).send({status:'error', error:'error getting users'})
    res.json({status:succes, result:{result}})
}

export const getUserByID = async(req,res)=>{
    const {uid} = req.params

    const result = await userService.getOneByID(sid)
    if (!result) return res.status(500).send({status:'error', error:'error getting user'})
    
    res.json({status:succes, result:{result}})
}

export const createUser = async(req,res)=>{
    const user = req.body
    const result = await userService.create(user)
    if (!result) return res.status(500).send({status:'error', error:'error creating user'})
    res.send({status:succes, result:{result}})
}

