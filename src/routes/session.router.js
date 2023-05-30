import {Router} from 'express'
import passport from 'passport'
import {createHash, generateToken} from '../utils.js'
import { validateRole, passportCall } from '../utils.js'
import User from '../DAO/mongo/users.mongo.js'
const router = Router()



router.get('/current', passportCall('jwt'), validateRole('user'), async(req,res)=>{
    
    const userDTO = new User()
    res.json(userDTO.getOneByEmail(req.user.email))
})
//Vista para registrar usuarios
router.get('/register', (req,res)=>{
    
    res.render('sessions/register')
})

//Api para crear usuarios en la db
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    
    
    res.json('/session/login')
})

// Vista de login
router.get('/login', (req, res)=>{
    
    res.render('sessions/login')
})





//API para login usando estrategia JWT. Devuelve el token generado a traves de la cookie especificada en JWT_COOKIE_NAME
router.post('/login', passport.authenticate('login'), async(req,res)=>{
    
    console.log("entra al login", req.user)
    
    if(!req.user) {
        return res.status(400).send({status: 'error', error:'Invalid Credentials'})
    }
    const token = generateToken(req.user)  
    console.log("Token", token)  
    
    res.send({message: "Logged in successfully", token: token, user: req.user})
    //res.json(req.user)
}
)

// API para generar link de recuperacion de contrasena

router.post('/recover', async(req,res)=>{
    console.log("recover", req.body)
    if(!req.body.email){
        return res.status(400).send({status: 'error', error:'Invalid Credentials'})
    }

    const token = generateToken(req.body.email)
    console.log(token)
    console.log(req.user)
    res.send({token: token})
})

// API para cambiar la contrasena

router.post('/passwordchange/:token',(req,res)=>{
    const {token} = req.params
    console.log('token', token)
    
})

//cerrar sesion
router.post('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) {
            
            res.status(500).send({payload:'error en logout'})
        }
        else {
            res.send({payload:'Successfully logged out'})
        } 
    })
})

//GITHUB

router.get(
    '/github',
         //   
    //}
    passport.authenticate('github',{scope:['user:email']}),
    async(req,res)=>{
        
        res.send("entro a github")
    }
)

router.get(
    '/githubcallback',
    passport.authenticate('github',{failureRedirect: '/login'}),
    async(req,res) =>{
        
        req.session.user = req.user
        
        res.send({'User':req.session.user})
    } 
)

export default router
