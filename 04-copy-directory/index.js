const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPath2 = path.join(__dirname, 'files-copy');



fs.mkdir(folderPath2, { recursive: true }, err => {
    if (err) throw err;
});

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(files);
    files.forEach(i => {

        fs.copyFile(path.join(folderPath, i), path.join(folderPath2, i), err => {
            if (err) throw err; // не удалось скопировать файл
            console.log('Файл успешно скопирован');
        });

    })

});




