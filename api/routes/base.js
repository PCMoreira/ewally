const Joi = require('joi');

const validate = (type, params) => (req, res, next) => {
  const schema = Joi.object().keys(params);
  const { value, error } = Joi.validate(req[type], schema, {
    allowUnknown: true,
  });
  req[type] = value;
  return error ? res.status(422).send({ error }) : next();
};

// Use to catch errors from async functions
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.response && err.response.status && err.response.config) {
      const loggerMsg = 'Error received from request uri (424): '
        .concat(err.response.config.url)
        .concat('\nERROR MESSAGE: ')
        .concat(err.message);
      console.log(loggerMsg);
      return res.sendStatus(424);
    }
    console.log(err.stack);
    return res.sendStatus(500);
  });
};

module.exports = {
  asyncMiddleware,
  validate
};
