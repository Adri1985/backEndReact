import { Router } from "express";
import { getProducts } from '../utils_fakers.js'

const router = Router()

router.get('/', async(req, res) => {
    
    console.log("1")
    res.send({status: "success", payload: getProducts() })
})

export default router