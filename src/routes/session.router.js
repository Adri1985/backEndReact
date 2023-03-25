import {Router} from 'express'
import passport from 'passport'
import {createHash, generateToken} from '../utils.js'
import { validateRole, passportCall } from '../utils.js'
const router = Router()



router.get('/current', passportCall('jwt'), validateRole('user'), async(req,res)=>{
    console.log("req.user en current",req.user)
    res.json({user:req.user.user})
})
//Vista para registrar usuarios
router.get('/register', (req,res)=>{
    console.log('entra en /register')
    res.render('sessions/register')
})

//Api para crear usuarios en la db
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    
    
    res.json('/session/login')
})

// Vista de login
router.get('/login', (req, res)=>{
    console.log("entra en el redirect de login")
    res.render('sessions/login')
})



const isAdmin=(user)=>{
    return(user.email=='adminCoder@coder.com'&& user.password=='adminCod3r123')
}


//API para login usando estrategia JWT. Devuelve el token generado a traves de la cookie especificada en JWT_COOKIE_NAME
router.post('/login', passport.authenticate('login'), async(req,res)=>{
    console.log('pasa el passport de login')
    
    if(!req.user) {
        return res.status(400).send({status: 'error', error:'Invalid Credentials'})
    }
    const token = generateToken(req.user)    
    console.log("Token: ", token, "req.user ", req.user)
    res.send({message: "Logged in successfully", token: token, user: req.user})
    //res.json(req.user)
}
)

//cerrar sesion
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) {
            console.log(err)
            res.status(500).render('erros/base', {error:err})
        }
        else {
            console.log("logged out")
            res.redirect('/api/session/login')
        } 
    })
})

//GITHUB

router.get(
    '/github',
         //   console.log('entra en github')
    //}
    passport.authenticate('github',{scope:['user:email']}),
    async(req,res)=>{
        console.log("entra a github")
        res.send("entro a github")
    }
)

router.get(
    '/githubcallback',
    passport.authenticate('github',{failureRedirect: '/login'}),
    async(req,res) =>{
        console.log("callback: ")
        req.session.user = req.user
        console.log("User Session", req.session.user)
        res.send({'User':req.session.user})
    } 
)

export default router
