
const express = require('express')
const port = 4000;
const cors = require('cors')
const bodyParser = require('body-parser')
const nameData = require('./src/names.json')
//const multer = require('multer')
//const mongoose = require('mongoose')
//require ('dotenv').config()

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

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

app.get('/getTotal', (req, res) =>{
    const result = JSON.stringify(nameData.names.length)
    res.status(200).send(result)
})
app.get('/getSingle/:name', (req, res) =>{
    console.log("To lower case: ",(nameData.names[1].name).toLowerCase())
    const result = nameData.names.find(elem => elem.name.toLowerCase() === req.params.name.toLowerCase() )
    console.log("Result in API : ",result, nameData.names,  req.params.name)
    res.status(200).send(result)
})

app.get('/', (req, res) =>{
    res.send("welcome to root")
})