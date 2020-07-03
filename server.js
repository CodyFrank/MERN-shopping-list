const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

// bodyParser middleware
app.use(bodyParser.json)

// db config
const db = require('./config/keys').mongoURI

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected to mongo"))
.catch(err=>console.log(err))

// create port
const port = process.env.PORT || 3000

app.get((res, req)=>{
    res.json({ hello: "Hello World" })
})

app.listen(port, ()=>console.log(`server started on ${port}`))