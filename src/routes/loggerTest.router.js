import { Router } from 'express'

import { addLogger } from '../utils/logger.js'

const router = Router()

router.get('/', (req,res)=>{
    console.log('loggertest')
    // req.logger.fatal('Advertencia !!')
    // req.logger.warninig('Warninng')
    // req.logger.info('Info')
    // req.logger.debug('debug')
    res.send({"result":"Logger tested"})
})
   


export default router