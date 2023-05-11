const fs = require('fs');
const path = require('path');

console.log(__filename);

let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));
stream.on('data', (chunk) => {
    console.log(chunk.toString());
})
