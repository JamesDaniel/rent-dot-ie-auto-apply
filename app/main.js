const parallel = require('run-parallel');
const path = require('path');
const fs = require('fs');

function getExecutors() {
    const fileNames = [];
    const normalizedPath = path.join(__dirname, 'executors');
    fs.readdirSync(normalizedPath).forEach((file) => {
        fileNames.push(file);
    });
    return fileNames;
}

function main(config) {
    const functs = getExecutors().map(el => {
        return function (callback) {
            require(`./executors/${el}`).execute(config, callback);
        }
    });

    parallel(functs,
        function (err, results) {
            if (results) {
                results.forEach((el) => {
                    console.log(`Program ended successfully: ${el}`);
                });
            }
            if (err) {
                err.forEach((el) => {
                    console.log(`Program failure: ${el}`);
                })
            }
        });

}

module.exports.main = main;