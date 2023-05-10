const fs = require('fs');
const path = require('path');

let result = [];

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }

            if (stats.isFile()) {
                const nameFail = path.basename(file, path.extname(file));
                const extension = path.extname(filePath).slice(1);
                const size = stats.size / 1024;
                result.push(`${nameFail}-${extension}-${size.toFixed(3)}kb`);

                if (result.length === files.length-1) {
                    console.log(result.join('\n'));
                }
            }
        });
    });
});
