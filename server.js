const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const path = require('path')
const dotenv = require("dotenv");
const cors = require('cors')
const config = require('config')

dotenv.config();

const app = express()

// bodyParser middleware
app.use(express.json())

// CORS
app.use(cors());


// connect to mongo
// process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=>console.log("connected to mongo"))
    .catch(err=>console.log(err))

// use routes
app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

// create port
const port = process.env.PORT ||  5000

app.listen(port, ()=>console.log(`server started on ${port}`))