const http = require('http'),
 url  = require('url'),
 fs   = require('fs'),
 read = require('./read'),
 express = require('express');

const host = '0.0.0.0';
const port    = '9000';

var app = express();
app.set('view engine', 'ejs');

    
let servingData = {};
    
// Build an array of functions as handlers
// Check for pathname as the key, and call the
// function that mataches the route

// Using Express we can use get('/') instead of handlers
// const handlers = [];

app.get('/api/', (req, res) => {
    
    res.statusCode = 200;
    // with express we can use res.json
    res.json(servingData.data)
});

// let's use express path vars
// app.get('/first', (req, res) => {

app.get('/api/s/:index', (req, res) => {
    let index = req.params.index;
    res.statusCode = 200;
    // with express we can use res.json
    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify(servingData.data[0])); 
    
    // parseInt(index)
    // res.json(servingData.data[0])
    res.json(servingData.data[parseInt(index)]);
});  
  
/************************  SEE ABOVE ************
app.get('/second', (req, res) => {
    res.statusCode = 200;
    // with express we can use res.json
    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify(servingData.data[1])); 
    res.json(servingData.data[1])
});
************************************************/

app.get('/about', (req, res) => {
    /* res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Learning Node, express, and mongo!'); */
    res.render('about', {
        title: "About Nodejs",
        message: "It's so much fun learing"
    })    
});

app.get('/', (req, res) => {
    res.render('index', {
        title: "Nodejs is awesome",
        message: "Keep learning new technologies to stay ahead of the pack!"
    })    
});

app.get('*', (req,res) => {
    res.status(404);
    res.send('Oops no goods!');
});

/**********  EXPRESS REMOVES THE NEED FOR THIS 
const server  = http.createServer((req, res) => {
      
      var pathname = url.parse(req.url, true).pathname;
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      
      if(handlers[pathname]) {
          handlers[pathname](req, res);
      } else {
          res.statusCode = 404;
          res.end("Not found!");
      }
      
});
************************************************/

let listen = new Promise(function(resolve, reject) {
    try {
      // with express replace server with app 
      // server.listen(port, host,  () => {
      app.listen(port, host,  () => {
        resolve(`Server running on http://${host}:${port}`);
       });   
       
    } catch(error) {
         reject(error);
    }
});

// Using fs to read file
// fs.readFile('charging_stations.json', 'utf-8', (err, data) => {
//      if (err) return;


/* read('charging_stations.json').then( (data) => {
     servingData = JSON.parse(data);
     return listen; 
}).then((message) => console.log(message)).catch((error) => console.log(error)); */

// Using read module 
// And async/await 

async function start() {
    try {
        servingData = await read('charging_stations.json');
        servingData = JSON.parse(servingData);
        console.log(await listen);
        
    } catch (error) {
        console.error(error);
    }
    return servingData;
};

start().then((data) => console.log(data));

module.exports = {
    // handlers: handlers,
    data: servingData.data
};