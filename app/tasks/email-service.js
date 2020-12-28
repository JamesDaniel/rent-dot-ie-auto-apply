const nodemailer = require("nodemailer");

async function sendEmail(config, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        pool: true,
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // use TLS
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_SENDER_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: `"james daniel" <${process.env.EMAIL_FROM}>`, // sender address
        to: process.env.EMAIL_TO_1, // list of receivers
        subject: "New Apartment Found", // Subject line
        text: `Found a new apartment: ${message}`,
    });

    // let info2 = await transporter.sendMail({
    //     from: `"james daniel" <${process.env.EMAIL_FROM}>`, // sender address
    //     to: process.env.EMAIL_TO_2, // list of receivers
    //     subject: "New Apartment Found", // Subject line
    //     text: `Found a new apartment: ${message}`,
    // });

    console.log("Message sent: %s", info.messageId);
    // console.log("Message sent: %s", info2.messageId);
}



module.exports.sendEmail = sendEmail