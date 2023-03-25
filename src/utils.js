import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import config from './config/config.js'

import passport from 'passport'

 

export default __dirname

export const createHash = password =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword =(user, password)=>{
    return(bcrypt.compareSync(password, user.password))
}


//JWT
// genera el token cuando el user viene por primera vez, lo devuelve
export const generateToken = user=> {
    const token = jwt.sign({user}, config.jwtPrivateKey, {expiresIn:'24h'})
    return token
}

//intenta obtener el token del cookie especificado, maneja dos errores, si no viene o si viene pero el verify da error, devuelve not autorized
export const authToken = (req,res,next) => {
    const token = req.headers.auth
    if(!token) return res.status(401).render('errors/base', {error: 'Not Authenticated'}) // NO TIENE TOKEN, NO VINO
    jwt.verify(token, config.jwtPrivateKey, (error, credentials)=>{
        if(error) return res.status(403).render('errors/base', {error: 'Not Authorized'}) // VINO PERO NO ESTA AUTORIZADO 
        req.user = credentials.user // si no hay errores, seteo el user para la sesion
        next()
    })
}

export const validateRole = role => (req,res, next) =>{
    console.log("req.user en validate role", req.user)
    console.log("user role", req.user.user.role)
    if(req.user.user.role === role)return next()
    return res.status(403).send({error: 'Only Admin role can create products'})
}


//solo extrae la cookie
// export const extractCookie = req => {
//     console.log("extract cookies", req.cookies)
//     return (req && req.cookies)? req.cookies.JWT_COOKIE_NAME : null
// }

export const extractCookie = req => {
       console.log("extract cookies", req.headers.authorization)
         return (req && req.headers.authorization)? req.headers.authorization : null
     }


export const passportCall = (strategy) => {
    return async (req,res,next) =>{
        passport.authenticate(strategy, function(err, user,info){
            if(err) return next(err)
            if(!user)return res.status(401).render('errors/base', {error:info.messages ? info.messages : info.toString()})
            req.user = user
            next()
        })(req,res,next) // PREGUNTAR ???
    }
}