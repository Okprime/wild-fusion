/**
 * @param err
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line consistent-return
module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.errorResponse({ statusCode: 400, message: err.message || err });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.errorResponse({ statusCode: 404, message: 'Document not found' });
  }
  res.status(500).send(`${err.stack || err}`);
};
