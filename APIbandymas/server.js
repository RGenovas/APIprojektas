const express = require('express')
const app = express()
const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://robertgenovas:PJW1tjM6QS2fAhxd@cluster0.bj026oy.mongodb.net/node3'





mongoose.connect(dbURI)
    .then(result => {
        app.listen(3000);
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));


app.use(express.json())



const testRouter = require('./routes/testroute')
app.use('/testroute',testRouter)