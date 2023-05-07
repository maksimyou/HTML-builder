const fs = require('fs');
const path = require('path');

console.log(__filename);

let stream = new fs.ReadStream(__filename);

stream.on('data', (chunk) => {

    fs.readFile(path.join(__dirname, 'text.txt'),
        'utf-8', (err, chunk) => {
            if (err) throw err;
            console.log(chunk);
        })
})