
const express = require('express')
const port = 4000;
//const cors = require('cors')
const bodyParser = require('body-parser')
const nameData = require('./src/names.json')
//const multer = require('multer')
//const mongoose = require('mongoose')
//require ('dotenv').config()

// const corsOptions = {
//     origin: ['http://localhost:3001', 'http://localhost:3000'],
//     credentials: true
// }

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors(corsOptions))

app.listen(port, () => {
    console.log('app started in port', port);
  });

// FEATURES
// List names and amounts, order by amount, most popular first /getNamesAndAmounts -> sort to popular 
// List names in alphabetical order /getNames -> sort to alphabetiacal order
// Return the total amount of all the names -> getTotal
// Return the amount of the name given as a parameter ->getTotal:name

// use getData as default for rest of the routes
app.get('/getData', (req, res) =>{
    nameData ? res.send(nameData) : res.status(500, "No names data found.")
})

app.get('/getNames', (req, res) =>{
    res.send("getOnlyNames")
})
app.get('/getTotal', (req, res) =>{
    res.send("getTotal")
})
app.get('/getTotal/:name', (req, res) =>{
    res.send(req.params.name)
})

app.get('/', (req, res) =>{
    res.send("welcome to root")
})