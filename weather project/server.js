// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors=require("cors");
const bodyParser = require('body-parser');
const app=express();


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port=3000;
const server=app.listen(port,()=>
    console.log("server is running")
);


app.get("/all",(req,res)=>{
    res.send(projectData)
    console.log(projectData);
});

app.post("/add",(req,res)=>{
    projectData.temp = req.body.temp;
	projectData.date = req.body.date;
	projectData.content = req.body.content;
    
    res.send(projectData);
})