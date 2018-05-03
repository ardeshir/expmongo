module.exports = function() {
    var rand = Math.floor(Math.random() * 3) + 1;
    var sentence = '';
    
    switch(rand) {
        case 1: 
            sentence = `Yoyo from the console ${rand}`;
            break;
        case 2:
            sentence = `What's up from the sentence module ${rand}`;
            break;
        case 3:
            sentence = `Hello from random crap ${rand}`;
            break;
        default:
            sentence = "We are the 99%!";
    }
    
    return sentence;
}