const fs = require('fs');
const delay = require('../async-utils').delay;

async function example(config) {
    while (true) {
        await delay(5000);
        
        console.log('example');
    }
}

function execute(config, callback) {
    try {
        example(config).then(() => {
            callback(null, 'add-to-file.js');
        })
    } catch (err) {
        callback('add-to-file.js');
    }
}

module.exports.execute = execute;