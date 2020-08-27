/* eslint-disable consistent-return,camelcase */
const { signInSchema, signUpSchema } = require('../schema/user');
const service = require('../service/user');
const userModel = require('../model/user');


module.exports = {

  // format numbers before saving to the db
  formatNumbers(phoneNumber) {
    const msisdn = phoneNumber.replace('+', '').trim();
    let filteredMsisdn = false;

    if (!msisdn) { return filteredMsisdn; }
    if (msisdn.match(/^234/i)) {
      filteredMsisdn = `${msisdn.substr(3)}`;
      if (filteredMsisdn.length > 10) {
        return false;
      }
    } else if (msisdn.length === 11) {
      filteredMsisdn = `${msisdn.substr(1)}`;
    } else if (msisdn.length === 10) {
      filteredMsisdn = msisdn;
    } else {
      filteredMsisdn = false;
    }

    if (Number.isNaN(+filteredMsisdn)) {
      filteredMsisdn = false;
    }
    return filteredMsisdn;
  },

  // signUp
  async userSignUp(req, res) {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    await signUpSchema.validateAsync(req.body);
    const newNumber = this.formatNumbers(req.body.phone_number);
    console.log('newNumber', newNumber);
    if (newNumber === false) {
      return res.errorResponse({
        message: 'Phone Number is not valid',
      });
    }
    req.body.phone_number = newNumber;
    const result = await service.userSignUp(req.body);
    console.log('result', result);
    let messageBody;
    if (result === false) {
      messageBody = 'Email already exist';
      return res.errorResponse({
        message: messageBody,
      });
    } if (result === null) {
      return res.errorResponse({
        message: 'An error occurred',
      });
    }
    messageBody = 'You have successfully signed up';
    return res.successResponse({
      message: messageBody,
      data: result,
    });
  },

  // userSignIn
  async userSignIn(req, res) {
    let messageBody;

    await signInSchema.validateAsync(req.body);
    const data = await service.getOneData(userModel, req.body);
    const isExist = await service.validateUser(data, req.body.password);
    console.log('here too', isExist);

    if (isExist) {
      console.log('success');
      messageBody = 'Sign in was successful';
      return res.successResponse({
        message: messageBody,
        data: isExist,
      });
    }
    if (isExist === false) {
      console.log('Incorrect password');
      messageBody = 'Incorrect password';
    } else if (isExist === null) {
      console.log('User does not exist, kindly sign up');
      messageBody = 'User does not exist, kindly sign up';
    }
    return res.errorResponse({
      message: messageBody,
    });
  },
};
