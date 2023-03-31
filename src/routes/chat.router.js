import express from 'express'

import { validateRole } from '../utils.js'

const router = express.Router()

router.get('/', validateRole('user'),(req, res) => {
    res.render('index', {})
})

export default router