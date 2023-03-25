import { Router } from 'express'
import querystring from 'querystring'
import {getAll, getOne, updateOne, createOne, deleteOne} from '../controllers/product.controller.js'

import { validateRole } from '../utils.js'

const router = Router()

router.get('/', getAll)
   
router.get('/:id',getOne)

router.post('/',validateRole('admin'),createOne)

router.put('/:id',validateRole('admin'),updateOne) 

router.delete('/:id',validateRole('admin'),deleteOne)

export default router