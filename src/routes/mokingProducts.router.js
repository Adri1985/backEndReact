import { Router } from "express";
import { getProducts } from '../utils_fakers.js'

const router = Router()

router.get('/', async(req, res) => {
    
    
    res.send({status: "success", payload: getProducts() })
})

export default router