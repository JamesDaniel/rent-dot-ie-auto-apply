const fs = require('fs');

function saveIfNotExists(config, newData) {
    const fileData = JSON.parse(fs.readFileSync(config.filename, 'utf8'));

    const uniqueKeys = fileData.map(el => el.linkUrl);

    const dataToSave = newData.filter(el => {
        return !uniqueKeys.includes(el.linkUrl);
    });

    dataToSave.forEach(el => {
        el.emailSent = false;
        el.smsSent = false;
        el.applicationSent = false;
    })

    dataToSave.forEach(el => fileData.push(el));

    console.log(`${dataToSave.length} new apartment(s) found`);

    if (dataToSave.length > 0) {
        fs.writeFileSync(config.filename, JSON.stringify(fileData, null, 2));
    }
}

function updateEmailsSent(config) {
    const fileData = JSON.parse(fs.readFileSync(config.filename, 'utf8'));

    fileData.forEach(el => el.emailSent = true);

    fs.writeFileSync(config.filename, JSON.stringify(fileData, null, 2));
}

function updateSmsSent(config) {
    const fileData = JSON.parse(fs.readFileSync(config.filename, 'utf8'));

    fileData.forEach(el => el.smsSent = true);

    fs.writeFileSync(config.filename, JSON.stringify(fileData, null, 2));
}

module.exports.saveIfNotExists = saveIfNotExists;
module.exports.updateEmailsSent = updateEmailsSent;
module.exports.updateSmsSent = updateSmsSent;