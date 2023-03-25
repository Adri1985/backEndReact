import {Router} from 'express'

import {getOrders, getOrderByID, createOrder} from '../controllers/rders.controller.js'

router.get('/', getOrders)

router.get('/uid', getOrderByID)

router.post('/', createOrder)

export default router