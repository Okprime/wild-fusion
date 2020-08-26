/* eslint-disable camelcase */
const Joi = require('@hapi/joi');

const name_of_prescription = Joi.string();
const description = Joi.string();
const number_of_tablet = Joi.number();
const number_of_times_daily = Joi.number();
const duration_of_dosage = Joi.number();


module.exports = {
  prescriptionSchema: Joi.object({
    name_of_prescription: name_of_prescription.required(),
    description: description.required(),
    number_of_tablet: number_of_tablet.required(),
    number_of_times_daily: number_of_times_daily.required(),
    duration_of_dosage: duration_of_dosage.required(),
  }),
};
