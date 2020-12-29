function sendSms(config, message) {
    const accountSid = config.twilioAccountSid;
    const authToken = config.twilioAuthToken;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: config.phoneFrom,
            to: config.phoneTo1
        })
        .then(message => console.log(message.sid));
    client.messages
        .create({
            body: message,
            from: config.phoneFrom,
            to: config.phoneTo2
        })
        .then(message => console.log(message.sid));
}

module.exports.sendSms = sendSms