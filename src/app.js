import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import routerViews from './routes/views.router.js'
import MessageManager from './manager/message.manager.js'
import sessionRouter from './routes/session.router.js'
import session from "express-session"
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializatePassport from './config/passport.config.js'
import { passportCall } from './utils.js'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import ordersRouter from './routes/users.router.js'
import storesRouter from './routes/users.router.js'


import {Server} from 'socket.io'
import cors from 'cors'

const app = express()
const URI = "mongodb+srv://ecommerce_main:ehq@ecommerce.iv6wj6x.mongodb.net"
const DB_NAME = 'test'

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('public'))
app.use(cookieParser())
console.log("sadsad")

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
console.log("sadsad")
app.use(express.static(__dirname+'/public'))
app.use('/', routerViews)
app.use('/api/session', sessionRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/stores', storesRouter)


console.log("sadsad")
//app.use('/api/products',productsRouter)

app.use('/api/products',passportCall('jwt'),productsRouter)
//app.use('/api/products',productsRouter)
app.use('/api/carts', cartRouter)
//app.use('/api/pets', petsRouter)

console.log("sadsad")

const messages =[]
mongoose.set('strictQuery', false)
mongoose.connect(URI, {dbName: DB_NAME}, error => {
    if (error) {
        console.log('No se pudo conectar a la DB:  ', error);
        return
    }
    console.log('DB connected!');

    // Corriendo el servidor
    const server = app.listen(8080, () => console.log('Server listening...'))
    const io = new Server(server)
    io.on('connection', socket => {
        console.log('New client connected');
    
        socket.on('message', data => {
            messages.push(data)
            console.log("data", data)
            new MessageManager().addMsg(data)
            io.emit('logs', messages)
        })
    })

})
