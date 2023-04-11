import { Router } from 'express'

import { addLogger } from '../utils/logger.js'


const router = Router()

router.use(addLogger)

router.get('/', (req,res)=>{
    try{
        console.log('loggertest')
        req.logger.fatal('Advertencia !!')
        req.logger.warning('Warninng')
        req.logger.info('Info')
        req.logger.debug('debug')
        res.send({"result":"Logger tested"})
    }
    catch(e){
        console.log(e)
    }

})
   


export default router