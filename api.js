module.exports = function(app, servingData) {
    
// READ ALL OF RESOURCE 
app.get('/api/', (req, res) => {
    res.statusCode = 200;
    res.json(servingData.data)
});


// READ ITEMS FROM RESOURCE 
app.get('/api/s/:index', (req, res) => {
    let index = req.params.index;
    res.statusCode = 200;
    res.json(servingData.data[parseInt(index)]);
});

// DELETE OF RESOURCE 
app.delete('/api/s/:index', (req, res) => {
    let index = req.params.index;
    res.statusCode = 200;
    delete servingData.data[parseInt(index)];
    res.send('Data Deleted');
});  

// REPLACE OF RESOURCE 
app.put('/api/s/:index', (req, res) => {
    let index = req.params.index;
    res.statusCode = 200;
    servingData.data[parseInt(index)] = {id: index, dummy: 'data'};
    res.send(servingData.data[parseInt(index)]);
});
  
  
  // ADD RESOURCE 
app.post('/api/', (req, res) => {
    let index = req.params.index;
    res.statusCode = 200;
    servingData.data.push({id: servingData.length, dummy: 'data'});
    res.send(servingData.data[servingData.length-1]);
}); 

 app.get('*', (req,res) => {
    res.status(404);
    res.send('Oops no goods!');
 });

  
}