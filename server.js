const http = require('http'),
 url  = require('url'),
 fs   = require('fs'),
 read = require('./read'),
 express = require('express'),
 api  = require('./api'), 
 bodyParser = require('body-parser');

const host = '0.0.0.0';
const port    = '9000';
let servingData = {};

var app = express();
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
   console.log('requested on path' + req.path);
   next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/about', (req, res) => {

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


let listen = new Promise(function(resolve, reject) {
    try {
        
      app.listen(port, host,  () => {
        resolve(`Server running on http://${host}:${port}`);
       });   
       
    } catch(error) {
         reject(error);
    }
});

// Using read module 
// And async/await 

async function start() {
    try {
        servingData = await read('charging_stations.json');
        servingData = JSON.parse(servingData);
        api(app, servingData);
        console.log(await listen);
        
    } catch (error) {
        console.error(error);
    }
    return servingData;
};

start().then((data) => console.log(data));

module.exports = {
    data: servingData.data
};