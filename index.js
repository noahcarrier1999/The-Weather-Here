//import Express framework and NeDB database
const express = require("express");
const Datastore = require("nedb");
require('dotenv').config();



//create an instance of an Express application
const app = express();

//Start the server on port 3000 and log a message to the console when it is ready
app.listen(3333, () => console.log("listening at 3333"));

//Serve static files from the public directory
app.use(express.static("public"));

//parse JSON bodies (as set by API clients) with the limit of 1mb per request
app.use(express.json({ limit: "1mb" }));

//initialize a new Nedb database instance, stored in 'database.db'
const database = new Datastore("database.db");
//load the database from disk
database.loadDatabase();

//define a route to handle POST request to '/api'
app.post("/api", (request, response) => {
  //log to the console when a request is recieved
  console.log("I got a request");

  
  //Extract the data from the request's body
  const data = request.body;
  
  //Generate a timestamp for when the request was recieved
  const timestamp = Date.now();
  //Add the timeStamp to the data object
  data.timestamp = timestamp;

  //insert data into your data base
  database.insert(data);

  //Extract the latitude and longitude from the request data
  const lat = data.lat;
  const long = data.long;
  const temp = data.farenheightTemp;
  const feelsLike = data.farenheightFeels;
  
  


  //send back a response back to the client

  response.json({
    status: "success",
    timestamp: timestamp,
    latitude: lat,
    longitude: long,
    temperature: temp,
    feels: feelsLike
  });
});

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get("/weather/:latlong", async (request,response)=>{
  console.log(request.params);
  const latlong = request.params.latlong.split(",");
  const lat = latlong[0];
  const long = latlong[1];
  const apiKey = process.env.API_KEY
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
  const fetch_Response = await fetch(api_url);
  const json = await fetch_Response.json();
  response.json(json);
  
})
    
