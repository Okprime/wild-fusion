/* eslint-disable no-underscore-dangle,camelcase,no-await-in-loop,no-restricted-syntax,consistent-return */
const prescriptionModel = require('../model/prescription');

module.exports = {
  async saveAPrescription(param) {
    const {
      name_of_prescription, description, number_of_tablet,
      number_of_times_daily, duration_of_dosage, email,
    } = param;
    const prescriptionObj = {
      name_of_prescription,
      description,
      usage_formula: `${number_of_tablet} tablet(s) to be taken, ${number_of_times_daily} time(s) daily`,
      duration: `This prescription will last for ${duration_of_dosage} days`,
      email,
    };
    try {
      return await prescriptionModel.create(prescriptionObj);
    } catch (e) {
      console.log('an error occurred', e);
    }
  },

  async deleteAPrescription(param) {
    try {
      const result = await prescriptionModel.findByIdAndRemove(param);
      console.log('result', result);
      return result;
    } catch (e) {
      if (e.message === 'document_missing_exception') {
        console.log('error', e);
      }
      throw e;
    }
  },


};
