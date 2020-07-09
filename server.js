const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')
const path = require('path')
const dotenv = require("dotenv");

dotenv.config();

const app = express()

// bodyParser middleware
app.use(bodyParser.json())

// db config
const db = require('./config/keys').mongoURI

// connect to mongo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log("connected to mongo"))
    .catch(err=>console.log(err))

// use routes
app.use('/api/items', items)

// Serve static assets if we are in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html '))
    })
}

// create port
const port = process.env.PORT ||  5000

app.listen(port, ()=>console.log(`server started on ${port}`))