/* eslint-disable consistent-return */
const nodemailer = require('nodemailer');

module.exports = {

  async sendEmailRemainder(data) {
    console.log('email data', data);
    const { body, to, subject } = data;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });
    const emailData = {
      from: `Admin ✔ <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html: body,
    };
    const info = await transporter.sendMail(emailData);
    if (info) {
      console.log('Info', info);
      return true;
    }
  },
};
