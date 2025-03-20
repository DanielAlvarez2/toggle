import express from 'express'
import Name from './models/Name.js'
import mongoose from 'mongoose'
import requestIp from 'request-ip'
const app = express();
(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()
const PORT = process.env.PORT || 1113
app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))
app.use(express.static('../dist'))
app.use(express.json())
app.use((req,res,next)=>{
    console.log(requestIp.getClientIp(req))
    next()
})
const items = [
    {name:'Laptop',price:500},
    {name:'Desktop',price:700},
]
app.get('/api/items', (req,res)=>res.send(items))
app.post('/api/names', async (req,res)=>{
    try{
        await Name.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        console.log('Added to Database: ___')
        res.json('Added to Database: ___')
    }catch(err){
        console.log(err)
    }
})
app.delete('/api/names/:id',async(req,res)=>{
    try{
        await Name.findByIdAndDelete(req.params.id)
        console.log('Deleted from Database: ___')
        res.json('Deleted from Database: ___')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/names',async(req,res)=>{
    try{
        const allNames = await Name.find()
        console.log('All Names from Database: ___')
        res.json(allNames)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/names/:id', async(req,res)=>{
    try{    
        const name = await Name.findById(req.params.id)
        console.log('1 Name from Database: ___')
        res.json(name)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/names/:id',async(req,res)=>{
    try{
        await Name.findByIdAndUpdate({_id:req.params.id},{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
        })
        res.json('Updated in Database: ___')
    }catch(err){
        console.log(err)
    }
})
