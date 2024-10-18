const nodemailer = require("nodemailer");
require("dotenv").config()

const Transporter = nodemailer.createTransport({
    // host: process.env.MAIL_SMTP,
    // port: process.env.MAIL_PORT,
    // secure: false, // true for port 465, false for other ports
    service : "Gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = Transporter;