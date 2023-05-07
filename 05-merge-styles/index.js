const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');
const folderPath2 = path.join(__dirname, 'project-dist', 'bundle.css');


fs.writeFile(
    folderPath2,
    '',
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
);
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(files);
    files.forEach(file => {
        const extension = path.extname(file).slice(1);
        if (extension === 'css') {
            fs.readFile(
                path.join(folderPath, file),
                'utf-8',
                (err, data) => {
                    if (err) throw err;
                    fs.appendFile(
                        folderPath2,
                        data,
                        (err) => {
                            if (err) throw err;
                            console.log('Файл был создан');
                        }
                    );
                }
            );
        }
    })

});