const express = require('express')
const app = express()
const requestIP = require('request-ip')
const mongoose = require('mongoose')
const IP = require('./models/IP.js')
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
app.use(express.urlencoded({extended:true}))









let uniqueIPs = new Set([])
let IPlist = []
app.use(async (req,res,next)=>{
    uniqueIPs.clear()
    console.log('--------------------------------------------')
    console.log('current IP: ' + requestIP.getClientIp(req))
    IPlist = await IP.find()
    IPlist.forEach(ip=>uniqueIPs.add(ip.IPaddress))
    console.log('Set: ' + [...uniqueIPs])
    console.log('Set Size: ' + uniqueIPs.size)
    console.log('IPlist: ' + IPlist)
    if (!uniqueIPs.has(requestIP.getClientIp(req))){
        await IP.create({IPaddress:requestIP.getClientIp(req)})
        console.log('adding to db');
            (async()=>{
                console.log('above try')
                try{
                    const html = `
                    <h1>New Visitor</h1>
                    <p>IP Address: ${requestIP.getClientIp(req)}</p>
                    `;
                    (async()=>{
                        const transporter = nodemailer.createTransport({
                            host:'smtp.ionos.com',
                            port:465,
                            secure:true,
                            auth:{
                                user:'daniel.alvarez@togglesoftware.com',
                                pass: process.env.PASSWORD
                            }
                        })
                        const info = await transporter.sendMail({
                            from:'Daniel Alvarez <daniel.alvarez@togglesoftware.com>',
                            to: 'daniel.yllanes@hotmail.com',
                            subject: 'Message from ToggleSoftware.com',
                            html: html
                        })
                        console.log('Message Sent:' + info.messageId)
                    })()
                }catch(err){
                    console.log(err)
                }
            })()
    }
    const IPlength = await IP.find()
    console.log(IPlength.length)
    IPlist = []
    next()
})










app.get('/', async(req,res)=>res.render('index.ejs'))
app.get('/contact', async(req,res)=>res.render('contact.ejs'))
app.get('/home', async(req,res)=>res.render('home.ejs'))
app.get('/faq', async(req,res)=>res.render('faq.ejs'))
app.get('/pricing', async(req,res)=>res.render('pricing.ejs'))
app.get('/login', async(req,res)=>res.render('login.ejs'))
app.post('/form2email', async(req,res)=>{
    try{
        console.log('req.body: '+req.body)
        const html = `
        <h1>Message from ToggleSoftware.com</h1>
        <p>From: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
        <p>Message:<br>${req.body.message}</p>
        `;
        (async()=>{
            const transporter = nodemailer.createTransport({
                host:'smtp.ionos.com',
                port:465,
                secure:true,
                auth:{
                    user:'daniel.alvarez@togglesoftware.com',
                    pass: process.env.PASSWORD
                }
            })
            const info = await transporter.sendMail({
                from:'Daniel Alvarez <daniel.alvarez@togglesoftware.com>',
                to: 'daniel.yllanes@hotmail.com',
                subject: 'Message from ToggleSoftware.com',
                html: html
            })
            console.log('Message Sent:' + info.messageId)
        })()
    }catch(err){
        console.log(err)
    }
    res.redirect('/')
})

app.listen(process.env.PORT, ()=> console.log(`Server Running on Port: ${process.env.PORT}`))