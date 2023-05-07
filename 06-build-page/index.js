const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'components');
const folderPath2 = path.join(__dirname, 'project-dist');
const folderPath3 = path.join(__dirname, 'styles');
const folderPath4 = path.join(__dirname, 'project-dist', 'style.css');
const folderPath5 = path.join(__dirname, 'assets');
const folderPath6 = path.join(folderPath2, 'assets');


function createDirFile(callback) {
    // Создаю папку
    fs.mkdir(folderPath2, { recursive: true }, (err) => {
        if (err) return callback(err);

        // Создаю файл index.html
        fs.writeFile(path.join(folderPath2, 'index.html'), '', (err) => {
            if (err) return callback(err);

            // Прочтение и сохранение файла - шаблона
            fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, indexTemplate) => {
                if (err) return callback(err);

                // Нахождение всех имён тегов в файлах компонентов
                fs.readdir(folderPath, (err, files) => {
                    if (err) return callback(err);

                    // Замена шаблонных тегов на содержимое файлов компонентов
                    let index = indexTemplate;
                    let filesProcessed = 0;
                    for (const file of files) {
                        fs.readFile(path.join(folderPath, file), 'utf-8', (err, data) => {
                            if (err) return callback(err);

                            const regExp = new RegExp('(\\{\\{' + path.basename(file, path.extname(file)) + '\\}\\})', 'g');
                            index = index.replace(regExp, data);

                            filesProcessed++;
                            if (filesProcessed === files.length) {
                                // Все файлы обработаны, вызываю обратный вызов с результатом
                                callback(null, index);
                            }
                        });
                    }
                });
            });
        });
    });
}

createDirFile((err, index) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.appendFile(
        path.join(folderPath2, 'index.html'),
        index,
        err => {
            if (err) throw err;
            console.log('Файл был изменен');
        }
    );

});


//Собираем стили css в  один файл
fs.writeFile(
    folderPath4,
    '',
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Файл был создан');
            fs.readdir(folderPath3, (err, files) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(files);
                    files.forEach(file => {
                        const extension = path.extname(file).slice(1);
                        if (extension === 'css') {
                            fs.readFile(
                                path.join(folderPath3, file),
                                'utf-8',
                                (err, data) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        fs.appendFile(
                                            folderPath4,
                                            data,
                                            (err) => {
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    console.log(`Содержимое файла ${file} было успешно добавлено в ${folderPath4}`);
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    }
);

//Копируем папку assets с файлами 

function copyFiles(path1, path2, callback) {

    // Функция для копирования файлов и папок рекурсивно
    function copy(path1, path2, callback) {
        fs.stat(path1, (error, stats) => {
            if (error) {
                callback(error);
            } else {
                if (stats.isDirectory()) {
                    fs.mkdir(path2, { recursive: true }, error => {
                        if (error) {
                            callback(error);
                        } else {
                            fs.readdir(path1, (error, files) => {
                                if (error) {
                                    callback(error);
                                } else {
                                    let count = 0;
                                    files.forEach(file => {
                                        copy(
                                            path.join(path1, file),
                                            path.join(path2, file),
                                            error => {
                                                if (error) {
                                                    callback(error);
                                                } else {
                                                    count++;
                                                    if (count === files.length) {
                                                        callback();
                                                    }
                                                }
                                            });
                                    });
                                }
                            });
                        }
                    });
                } else if (stats.isFile()) {
                    fs.copyFile(
                        path1,
                        path2,
                        error => {
                            if (error) {
                                if (error.code === 'EPERM') {
                                    console.log('Нет прав для копирования файла, повторная попытка');
                                    copy(path1, path2, callback);
                                } else {
                                    callback(error);
                                }
                            } else {
                                console.log('Файл успешно скопирован');
                                callback();
                            }
                        });
                }
            }
        });
    }

    // Начать копирование
    copy(path1, path2, error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Копирование завершено');
        }
        callback(error);
    });
}

copyFiles(folderPath5, folderPath6, error => {
    if (error) {
        console.error(error);
    } else {
        console.log('Копирование завершено');
    }
});
