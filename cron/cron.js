/* eslint-disable max-len,no-await-in-loop,no-underscore-dangle,no-restricted-syntax,no-lone-blocks,no-empty-function */
const cron = require('node-cron');
const remainder = require('../service/remainder');
const prescriptionModel = require('../model/prescription');

// Send a remainder email every 8 hours
cron.schedule('* * * * *', async () => {
  console.log('This scheduler runs every minute');

  async function getPrescription() {}

  await getPrescription();
  {
    try {
      const data = await prescriptionModel.find();
      for (const obj of data) {
        await remainder.sendNotification(obj);
      }
    } catch (e) {
      console.log('another kind of error', e);
    }
  }
}, {
  scheduled: true,
});


module.exports = cron;
