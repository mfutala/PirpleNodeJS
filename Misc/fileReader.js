let fs = require('fs');

let fileContents = fs.readFileSync("/home/mfutala/Desktop" + "/resetInternet.txt", 'utf8');

let lines = fileContents.split(/\r?\n/);
let smallLines = fileContents.match(/.{1,10}/g).join('\n');

console.log(smallLines);
console.log(fileContents);

lines.forEach(element => {
console.log(element);
})

//Hello World


