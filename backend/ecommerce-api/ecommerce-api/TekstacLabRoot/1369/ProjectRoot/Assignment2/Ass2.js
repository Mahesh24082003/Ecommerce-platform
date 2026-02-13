import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express()
app.use(express.json())
const car =[];

app.get('/read',(req,res)=>{
    res.json(car)
})

app.post('/insert',(req,res)=>{
    const{id,name} = req.body;
    const exist=car.some( c => c.id ===id )
    if(exist){
        res.status(400).json("Product id already exists")
    }
    else{
        car.push({id,name})
        res.json("Product added successfully")
    }

})
app.put('/update/:id',(req,res)=>{
    const{id}= req.params;
    const{name}=req.body;
    const carObj= car.find(c => c.id === id)
    if(!carObj){
       return res.status(404).json("ID does not exists")
    }
    carObj.name = name;
    res.json(car);
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
   
    const index = car.findIndex(c => c.id === id);

    if(index === -1){
        return res.status(400).json("ID does not exists")
    }
    car.splice(index,1);
    res.json(car);
})

const port = process.env.PORT || 3030
app.listen(port,()=>{
    console.log(`Server listening at port http://localhost:${port}`)
})