import express from 'express'
import { addLogger } from './utils/logger.js'

const app = express()

app.get('/', (req,res)=>{
    req.logger.fatal('Advertencia !!')
    req.logger.warninig('Warninng')
    req.logger.info('Info')
    req.logger.debug('debug')
    res.send({message: 'LoggerTest'})

})
app.search(addLogger)

app.listen('8080', ()=>console.log('Listeninng ...'))