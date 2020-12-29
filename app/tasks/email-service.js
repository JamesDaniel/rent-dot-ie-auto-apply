const nodemailer = require("nodemailer");

function sendEmail(config, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        pool: true,
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // use TLS
        auth: {
            user: config.emailFrom,
            pass: config.emailSenderPassword
        }
    });

    console.log('Sending emails with message: \n' + message);

    const promises = [];
    promises.push(transporter.sendMail({
        from: `"james daniel" <${config.emailFrom}>`, // sender address
        to: config.emailTo1, // list of receivers
        subject: "New Apartment Found", // Subject line
        text: `Found a new apartment: ${message}`,
    }));
    promises.push(transporter.sendMail({
        from: `"james daniel" <${config.emailFrom}>`, // sender address
        to: config.emailTo2, // list of receivers
        subject: "New Apartment Found", // Subject line
        text: `Found a new apartment: ${message}`,
    }));

    return Promise.all(promises);
}



module.exports.sendEmail = sendEmail