const {Router} = require('express');
const {name, version} = require('../../../package.json');
const { asyncMiddleware, validate } = require('../base');
const Joi = require('joi');

const barcodesController = require('../../controllers/barcodes');

module.exports = (app) => {
    const api = Router();
    app.use('/v1', api);

    //HealthCheck
    api.route('/').get((req, res) => res.send({name, version}));

    // check barcodes
    api.route('/barcodes').get(
        validate('query', {
            code: Joi.string().required()
        }),
        asyncMiddleware(barcodesController.checkBarCodes)
    )
};