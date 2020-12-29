const smsService = require('../tasks/sms-service');
const updateSmsSent = require('../tasks/data-service').updateSmsSent;
const fs = require('fs');

async function listenForFileChanges(config) {
    try {
        fs.watch(config.filename, (eventType, filename) => {
            if (filename && eventType === 'change') {
                const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

                sendSms(config, data.filter(el => !el.smsSent));
            }
        });
    } catch (error) {
        console.log('Trying again: ' + error);
    }
}

function sendSms(config, data) {
    if (data.length < 1) {
        return;
    }
    const message = "New Apartments Found. Check your email";
    smsService.sendSms(config, message);
    updateSmsSent(config);
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