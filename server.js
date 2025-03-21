const express = require('express')
const app = express()
const mongoose = require('mongoose');

(async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())

app.get('/', async(req,res)=>res.render('index.ejs'))

app.listen(process.env.PORT, ()=> console.log(`Server Running on Port: ${process.env.PORT}`))