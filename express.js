
const express = require('express')
const port = 4000;
const cors = require('cors')
const bodyParser = require('body-parser')
const nameData = require('./src/names.json')

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.listen(port, () => {
    console.log('app started in port', port);
  });

app.get('/getData', (req, res) =>{
    try{
        if(typeof(nameData) === "object"){
            res.status(200).send(nameData)
        }
        else{
            throw new Error("Invalid data type. Expected Object")
        }
    }
    catch(e){
        console.error("Error. ",e)
        res.status(500).send(e)
    }
})

app.get('/getTotal', (req, res) =>{
    try{
        const result = nameData.names.length
        if(typeof(result) === "number"){
            res.status(200).send(JSON.stringify(result))
        }
        else{
            throw new Error("Invalid data type. Expected Number")
        }
    }
    catch(e){
        console.error("Error. ",e)
        res.status(500).send(e)
    }
})
app.get('/getSingle/:name', (req, res) =>{
    try{
        const result = nameData.names.find(elem => elem.name.toLowerCase() === req.params.name.toLowerCase() )
        if(result){
            res.status(200).send(result)
        }
        else{
            console.error("Name not found")
            throw new Error("Name not found")
        }
    }
    catch(e){
        res.status(404).send(e)
    }
})

app.get('/', (req, res) =>{
    res.send(`Welcome to Name Search API root. You can read more about the endpoints from github ReadMe document`)
})