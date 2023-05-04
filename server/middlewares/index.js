/* eslint-disable import/prefer-default-export */
function pathMiddleware(req, res, next) {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session?.user;
  next();
};

module.exports = { pathMiddleware };
