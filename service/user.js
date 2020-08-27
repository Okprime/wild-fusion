/* eslint-disable camelcase,consistent-return,no-underscore-dangle,prefer-arrow-callback */
/* eslint-disable max-len */

const bcrypt = require('bcryptjs');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');

const generateTokenForAClient = (userData) => jwt.sign({ userData }, process.env.SECRET_KEY);


module.exports = {

  // hash the password before saving to the db
  async hashPassword(data) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
          resolve(hash);
        });
      });
    });
  },

  async userSignUp(data) {
    const hashed = await this.hashPassword(data.password);
    const format = {
      email: data.email,
      password: hashed,
      phone_number: data.phone_number,
      name: data.name,
    };
    try {
      const result = await userModel.create(format);
      const token = await generateTokenForAClient(result);
      delete format.password;
      return {
        _id: result._id,
        email: result.email,
        phone_number: result.phone_number,
        name: result.name,
        token,
      };
    } catch (e) {
      console.log('The error got here');
      if (e.name === 'MongoError' && e.code === 11000) {
        return false;
      }
      return e;
    }
  },

  async getOneData(model, data) {
    let result = {};
    const { email } = data;
    try {
      result = await model.findOne({ email });
      return result;
    } catch (e) {
      if (e.name !== 'DocumentNotFoundError') {
        throw e;
      }
    }
    return null;
  },

  async validateUser(param, yet) {
    if (param === null) {
      console.log('Data gotten');
      return null;
    }
    // Load hash from your password DB.
    return bcrypt.compare(yet, param.password).then(async (result) => {
      console.log('result', result);
      if (param && result === true) {
        const user = param.toObject();
        delete user.password;
        return user;
      }
      return result;
    });
  },
};
