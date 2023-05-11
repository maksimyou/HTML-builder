
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPath2 = path.join(__dirname, 'files-copy');

const deleteCreateFolder = (callback) => {
    if (fs.existsSync(folderPath2)) {
        fs.rmdir(folderPath2, { recursive: true }, (err) => {
            if (err) {
                console.error(`Failed to delete ${folderPath2}: `, err);
                callback(err);
            } else {
                console.log(`Deleted ${folderPath2}`);
                fs.mkdir(folderPath2, { recursive: true }, callback);
            }
        });
    } else {
        fs.mkdir(folderPath2, { recursive: true }, callback);
    }
};

deleteCreateFolder((err) => {
    if (err) throw err;

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(files);
        files.forEach(i => {
            fs.copyFile(path.join(folderPath, i), path.join(folderPath2, i), (err) => {
                if (err) {
                    console.error(`Failed to copy ${i}: `, err);
                    return;
                }
                console.log(`Copied ${i} to ${folderPath2}`);
            });
        });
    });
});


