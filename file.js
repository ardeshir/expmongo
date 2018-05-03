const fs = require('fs');
let content;

try {
    console.log("Before reading fs");
    
    // First read file synchronicly 
    //content = fs.readFileSync("text.txt", 'utf-8');
    
    fs.readFile("text.txt", 'utf-8', function(err, data){
        if (err) return;
        console.log(data);
    })    
    // console.log(content);
    
    console.log("After  reading fs");

    
} catch(err) {
    console.log(err);
}