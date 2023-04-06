import passport from "passport"
import {UserService} from "../repository/index.js"
import GitHubStrategy from "passport-github2"
import passport_jwt from 'passport-jwt'
import local from 'passport-local'
import {createHash, isValidPassword, generateToken, extractCookie} from '../utils.js'



const JWTStrategy = passport_jwt.Strategy
const ExtractJWT = passport_jwt.ExtractJwt

const localStrategy = local.Strategy
import config from './config.js'


const initializatePassport = ()=>{

    
    //Login strategy
    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try{
            
            
            let user = await UserService.getOneByEmail(username)

            
            if(!user) {
                
                return done(null, user)
            }
            
            if(!isValidPassword(user, password)) return done(null, false)
            //const token = generateToken(user)
            //
            //user.token = token NO SE PUDO ASIGNAR TOKEN A USER, VER PORQUE
            
            //req.user = user
            return done(null, user)
        }
        catch(error){

        }

    }
    
    
    ))
    
    //register
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {

        const {first_name, last_name, email, age, role } = req.body
        try {
            const user = await UserService.getOneByEmail(username)
            if(user) {
                
                return done(null, false)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role
            }
            
            const result = await UserService.create(newUser)
            
            return done(null, result)
        } catch (error) {
            return done("[LOCAL] Error al obtener user " + error)
        }


    }))

    //GITHUB strategy
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.2caed7d087464c63',
        clientSecret: 'd924a908e12ada000d593a3198b3d423a294d956',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async(accessToken, refreshToken, profile, done)=>{
        
        
        
        
        try{
            const user = await UserService.getOneByEmail(profile._json.email)
            if(user) return done(null,user)
            const newUser = new UserService({    //EN ESTA PARTE, SI NO ECUENTRO EL USUARIO QUISIERA REDIRIGIR AL REGISTER
                first_name: profile._json.login,
                last_name:'',
                email: profile._json.email,
                age:'30',
                password: '',
                role:'admin'
            })
            //await newUser.save()
            
            return done(null, newUser)
        }
        catch(error){
            return done('Error to login with github' + error)
        }

    }))

    



    //JWT strategy
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: 'Llave Privada ASDASDAS'
    }, async(jwt_payload, done) => {
        
        //req.session.user = jwt_payload.user
        done(null, jwt_payload)
    }))

    
    passport.serializeUser((user, done)=>{
       done(null, user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        const user = UserService.findById(id)
        done(null, user)
    })
}

export default initializatePassport