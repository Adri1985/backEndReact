import {Router} from 'express'

import {getOrders, getOrderByID, createOrder} from '../controllers/orders.controller.js'

const router = Router()

router.get('/', getOrders)

router.get('/uid', getOrderByID)

router.post('/', createOrder)

export default router