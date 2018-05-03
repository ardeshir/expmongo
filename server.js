const http = require('http');
const url  = require('url');
const fs   = require('fs');
const read = require('./read');

const host = '0.0.0.0';
const port    = '9000';


/* const arrStations = [
    { id: '1',
      where: 'london',
      address: 'Tenth Avenue Notht',
      type: 'electric charger'
    },
    { id: 2,
      Where: 'new york',
      address: 'Fifth Avenue South',
      type: 'lectric charger' }
    ]; */
    
let servingData = {};
    
// Build an array of functions as handlers
// Check for pathname as the key, and call the
// function that mataches the route

const handlers = [];

handlers['/'] = (req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(servingData.data)); 
}


handlers['/first'] = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(servingData.data[0])); 
}   
  
handlers['/second'] = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(servingData.data[1])); 
}

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
      
      /* if(pathname.indexOf('first') != -1) {
      res.end(JSON.stringify(arrStations[0]));
      } else {
       res.end(JSON.stringify(arrStations)); 
      } */
});

let listen = new Promise(function(resolve, reject) {
    try {
        
      server.listen(port, host,  () => {
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
    handlers: handlers,
    data: servingData.data
};