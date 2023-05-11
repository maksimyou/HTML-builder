const fs = require('fs');
const path = require('path');
const process = require('process')

console.log(path.join(__dirname, 'text.txt'))

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

process.stdout.write('Введите ваш текст\n')

process.stdin.on('data', data => {
    let buf = Buffer.from('exit', 'utf-8');
    if (buf.toJSON().data.join() === data.toJSON().data.slice(0, 4).join()) {
        process.stdout.write('Удачи!')
        process.exit();
    } else {
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            data,
            err => {
                if (err) throw err;
                console.log('Файл был изменен');
            }
        );

    }

});

process.on('SIGINT', () => {
    process.stdout.write('Удачи!')
    process.exit();
});

