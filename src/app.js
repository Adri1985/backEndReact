import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import routerViews from './routes/chat.router.js'
import MessageManager from './manager/message.manager.js'
import sessionRouter from './routes/session.router.js'
import session from "express-session"
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializatePassport from './config/passport.config.js'
import { passportCall } from './utils.js'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import ordersRouter from './routes/orders.router.js'
import storesRouter from './routes/stores.router.js'
import mockingProductsRouter from './routes/mokingProducts.router.js'
import errorHandler from './middlewares/error.js'

import loggerRouter from './routes/loggerTest.router.js'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'




import {Server} from 'socket.io'
import cors from 'cors'




const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info:{
            title: "Backend Documentation for e HQ ",
            description:"This documentation list all the APIS under e HQ backend project"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]

}

const specs = swaggerJSDoc(swaggerOptions)
const app = express()
const URI = "mongodb+srv://ecommerce_main:ehq@ecommerce.iv6wj6x.mongodb.net"
const DB_NAME = 'test'

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('public'))
app.use(cookieParser())


// Config engine templates
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(session({
  secret: "CoderSecrets"
}))
initializatePassport()
app.use(passport.initialize())
app.use(passport.session())
//  app.all('/*', function(req, res) {
//      req.header("Access-Control-Allow-Origin", "*");
//      req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  });

app.use(cors())

app.use(express.static(__dirname+'/public'))
app.use('/', routerViews)
app.use('/api/session', sessionRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/stores', storesRouter)
app.use('/api/loggerTest', loggerRouter)
app.use('/api/mockingproducts',mockingProductsRouter)



//app.use('/api/products',productsRouter)

app.use('/api/products',passportCall('jwt'),productsRouter)
//app.use('/api/products',productsRouter)
app.use('/api/carts', cartRouter)
//app.use('/api/pets', petsRouter)
app.use(errorHandler)






const messages =[]
mongoose.set('strictQuery', false)
mongoose.connect(URI, {dbName: DB_NAME}, error => {
    if (error) {
        
        return
    }
    

    // Corriendo el servidor
    const server = app.listen(8080, () => console.log("listening..."))
    const io = new Server(server)
    io.on('connection', socket => {
        
    
        socket.on('message', data => {
            messages.push(data)
            
            new MessageManager().addMsg(data)
            io.emit('logs', messages)
        })
    })

})
