const express = require('express')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
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
app.get('/contact', async(req,res)=>res.render('contact.ejs'))
app.post('/form2email', async(req,res)=>{
    try{
        const info = `
        <h1>Message from ToggleSoftware.com</h1>

        `
    }catch(err){
        console.log(err)
    }
})

app.listen(process.env.PORT, ()=> console.log(`Server Running on Port: ${process.env.PORT}`))