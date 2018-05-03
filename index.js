const cow = require('cowsay');
const chalk  = require('chalk');
const sentence = require('./sentence');


console.log(chalk.blue('Cow will say something too!'));
console.log(chalk.keyword('brown').bold(cow.say({
    
    text: sentence(),
    e: "oO",
    T: "U "
    
})));

