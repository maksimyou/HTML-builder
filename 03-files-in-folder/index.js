const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const result = [];

    files.forEach((file, index) => {
        const filePath = path.join(folderPath, file);

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if (stats.isFile()) {
                const nameFail = path.basename(file, path.extname(file));
                const extension = path.extname(filePath).slice(1);
                const size = stats.size / 1000;
                result.push(`${nameFail}-${extension}-${size.toFixed(3)}kb`);
            }

            if (index === files.length - 1) {
                console.log(result.join('\n'));
            }
        });
    });
});
