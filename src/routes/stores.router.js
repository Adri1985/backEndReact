import {Router} from 'express'

import {getUsers, getUserByID, createUser} from '../controllers/users.controller.js'

router.get('/', getUsers)

router.get('/:uid', getUserByID)

router.post('/', createUser)

export default router