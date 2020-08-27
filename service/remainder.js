const utility = require('../lib/utility');

module.exports = {
  notification: {
    prescription_remainder: {
      info: 'This is a Reminder Email',
      emailBody: '<h4>Hello,<br><br>Do not forget to take your prescription <strong>Thanks.<br><Admin></strong></h4><br><br>',
      subject: 'Prescription Reminder',
    },
  },

  // send a remainder email for a user
  async sendNotification(param) {
    const body = {};
    body.message = this.notification.prescription_remainder.info;
    const email = {
      body: this.notification.prescription_remainder.emailBody,
      to: param.email,
      subject: this.notification.prescription_remainder.subject,
    };
    await utility.sendEmailRemainder(email);

    console.log('This is the body', body);
    return body;
  },
};
