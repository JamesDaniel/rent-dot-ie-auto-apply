const fs = require('fs');
const emailService = require('../tasks/email-service');
const apartmentListTask = require('../tasks/apartment-list-task');

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

function sendEmail(config, data) {
    if (data.length < 1) {
        return;
    }
    const message = data.reduce((preVal, curVal) => {
        return (preVal + curVal.linkUrl + "\n");
    }, "\nApartments Found List: \n");
    emailService.sendEmail(config, message);

    apartmentListTask.updateEmailsSent(config);
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