import http from "http"
import {parse} from "url"

let products =[]

function sendJSON(res, status,body){
    res.writeHead(status,{'Content-Type':'application/json'});
    res.end(JSON.stringify(body));
}

const server= http.createServer((req,res)=>{

    const logEntry =`${new Date().toISOString() }`;
    console.log(logEntry)
    const parsedUrl = parse(req.url,true);
    const method = req.method;
    const path = parsedUrl.pathname;
    console.log(method);
    console.log(path)


if (method === 'GET' && path === '/'){
    return sendJSON(res,200,{
        message : "Welcome to TechStore API"
    })
}

if (method === 'GET' && path === '/product'){
    const {name} =parsedUrl.query;
    if(!name){
        return sendJSON(res,404,{
            error:"Product name query parameter is required,"
        })
    }
    const product = products.find(p =>p.name === name);
    if(product){
        return sendJSON(res,200,product)
    }
    else{
        return sendJSON(res,404,{
            error:"Product not found .Try Keyboard,mouse,speaker,etc"
        });
    }
}
if (method === 'POST' && path ==='/product'){
    let body = '';
    req.on('data',chunk =>{ 
        body += chunk;
    })

    req.on('end',()=>{
       let data;
       try{
        data=JSON.parse(body);
       }catch{
        return sendJSON(res,400,{
            error:"Invalid JSON Format"
        })
        }
        const {name,description} = data;
        if(!name || !description){
            return sendJSON(res,400,{
                error:"Name and descriptiom are required."
            })
        }
        products.push({name,description});
        return sendJSON(res,200,{
            message:"Product added successfully"
        })
    
    });
    return;
}

sendJSON(res,404,{error : "Route not found or method not supported."});
})
server.listen(3001,()=>{
     console.log("Server running at http://localhost:3000");
        
     
})