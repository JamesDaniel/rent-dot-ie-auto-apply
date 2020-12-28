const fs = require('fs');

async function listenForFileChanges(config) {
    try {
        fs.watch(config.filename, (eventType, filename) => {
            if (filename && eventType === 'change') {
                const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

                sendEmail(config, data.filter(el => !el.emailSent));
            }
        });
    } catch (error) {
        console.log('Trying again: ' + error);
    }
}

async function sendEmail(config, data) {
    console.log('this is where code for sending email will go.');
    console.log(JSON.stringify(data, null, 2));
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