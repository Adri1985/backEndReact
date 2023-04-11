import winston from 'winston'

const customLevelsOptions ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,
        http:5

    },
    colors:{
        fatal:'red',
        error:'orange',
        warning:'yellow',
        info:'blue',
        debug:'white',
        http:'green'
    }
}

const logger = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
        level:'info', 
        format:winston.format.combine(winston.format.simple())}),
        new winston.transports.File({filename:'./errors.log', 
        level:'warnining',
        format: winston.format.simple()})
    ]
})

export const addLogger = (req,res,next)=>{
    try{
        console.log("entra al logger")
        req.logger = logger
        req.logger.http(`${req.method} on ${req.url} - ${new Date().toLocaleDateString()}`)
    }
    catch(e){
        console.log(e)
    }
   
    next()
}