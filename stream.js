const through2 = require('through2');
const cowsay   = require('cowsay');

process.stdin.pipe(through2(function (chunk, enc, done) {
    
      this.push(cowsay.say({ text: '' + chunk }));
      
      done();
    
})).pipe(process.stdout);
