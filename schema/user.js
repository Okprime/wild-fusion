/* eslint-disable camelcase */
const Joi = require('@hapi/joi');

const email = Joi.string();
const password = Joi.string();
const phone_number = Joi.number();
const name = Joi.string();

module.exports = {
  signUpSchema: Joi.object({
    name: name.required(),
    phone_number: phone_number.required(),
    email: email.required().email({ minDomainSegments: 2 }),
    password: password.required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password'),
  }),

  signInSchema: Joi.object({
    email: email.required().email({ minDomainSegments: 2 }),
    password: password.required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
};
