import { response, Router } from 'express'

import mongoose from 'mongoose'

import {getAll, getOne, createOne, updateOne, addProductToCart, deleteProductFromCart, updateProductsOnCart, updateProductQuantity, deleteOne} from '../controllers/cart.controllers.js'

const router = Router() 

router.get('/', getAll)

router.get('/:id', getOne)

router.post('/', createOne)

router.post('/:cid/product/:pid', addProductToCart)

router.delete('/:cid/products/:pid', deleteProductFromCart)

router.put('/:cid', updateProductsOnCart)

router.put('/:cid/products/:pid', updateProductQuantity)

router.delete('/:cid', deleteOne)

export default router