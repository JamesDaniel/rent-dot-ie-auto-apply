const fs = require('fs');

async function listenForFileChanges(config) {
    try {
        await sendEmail(config);
    } catch (error) {
        console.log('Trying again: ' + error);
    }
}

async function sendEmail(config) {
    console.log('this is where code for sending email will go.');
}

function execute(config, callback) {
    try {
        listenForFileChanges(config).then(() => {
            callback(null, 'add-to-file.js');
        })
    } catch (err) {
        callback('add-to-file.js');
    }
}

module.exports.execute = execute;