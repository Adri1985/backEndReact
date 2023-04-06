import winston from 'winston'

const customLevelsOptions ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debut:4
    },
    colors:{
        fatal:'red',
        error:'orange',
        warning:'yellow',
        info:'blue',
        debut:'white'
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
    console.log("entra al logger")
    req.logger = logger
    req.logger.http(`${req.method} on ${req.url} - ${new Date().toLocaleDateString()}`)
    next()
}