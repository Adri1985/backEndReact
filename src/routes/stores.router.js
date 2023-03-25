import {Router} from 'express'

import {getStores, getStoreByID, createStore, addProduct} from '../controllers/stores.controllers.js'

const router = Router()

router.get('/', getStores)

router.get('/:sid', getStoreByID)

router.post('/', createStore)

router.post('/:sid/products/:pid', addProduct)

export default router