import express from 'express';
import morgan from 'morgan';
import fs from  'fs';
import path from 'path';
import winston from 'winston';

const app = express();
app.use(express.json());

const logDirectory = 'logs';
if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
}

const logger =  winston.createLogger({
    level:'info',
    format: winston.format.combine(
        winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.json(),
    ),
    transports:[
        new winston.transports.File({ filename: path.join(logDirectory,'app.log')}),
        new winston.transports.Console()
    ]
});

const morganToWinston = morgan('tiny',{
    stream:{
        write:(message)=>logger.info(message.trim())
    }
})
app.use(morganToWinston);

let orders = [];

app.use((req,res,next)=>{
    logger.info({
        event :'incoming-request',
        method:req.method,
        url:req.originalUrl,
        timestamp:new Date().toISOString()
    });
    next();
})

app.get('/orders',(req,res)=>{
    logger.info("Fetched all orders");
    res.json(orders);
})

app.post('/orders',(req,res)=>{
    const{customer,item,quantity}=req.body;
    if(!customer||!item||!quantity){
        logger.error('Invalid order : Missing fields');
        return res.status(400).json({error:'Invalid order :Missing Fields'});

    }
    const order ={
        customer,item,quantity,createdAt: new Date().toISOString()
    };
    orders.push(order);
    logger.info(`New order placed by ${customer} for ${quantity} ${item}`)
    res.status(201).json({message:'Order placed successfully',order});
})
app.listen(8080,()=>{
    logger.info("Server running at port http://localhost:8080")
})

