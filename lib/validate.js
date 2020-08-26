/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

module.exports = (req, res, next) => {
  if (process.env.URL_PATH.includes(req.url)) {
    return next();
  }
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.send({
      auth: false,
      code: 400,
      message: 'No token provided.',
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      console.log('Failed to verify token. Invalid token provided');
      return res.send({
        auth: false,
        code: 401,
        message: 'Failed to verify token. Invalid token provided',
      });
    }
    userModel.findOne(decoded.id, async (err, client) => {
      if (err) {
        console.log('There was a problem finding the user.');
        return res.send({
          code: 500,
          message: 'There was a problem finding the user.',
        });
      } if (!client) {
        console.log('No user found.');
        return res.send({
          code: 404,
          message: 'No user found.',
        });
      }
      req.decoded = decoded.userData;
      next();
    });
  });
};
