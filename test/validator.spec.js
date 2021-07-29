const expect = require('chai').expect;
const { specificValidator, firstCodeValidator } = require('../api/utils/validator');

const mockValidPayload = require('./mocks/mockIsValidPayload.json');
const mockInvalidPayload = require('./mocks/mockInvalidPayload.json');

const mockResponse = require('./mocks/mockPayloadResponse.json');


describe(':: ewally challenge test ::', () => {

  it('Validator code test.', () => {
    const result = specificValidator(mockValidPayload);
    expect(result).to.be.eql(mockResponse);
    });

  it('Validator Error code test.', () => {
    const result = specificValidator(mockInvalidPayload);
    expect(result.status).to.be.eql(400);

    });  
  
  it('First validator Erro 400 test.', () => {
    const response = firstCodeValidator('112a');
    expect(response.status).to.be.eql(400);
    expect(response.message).to.be.eql('The code format is invalid. Please, check your code.');

    });
  
  it('First validator test.', () => {
    const response = firstCodeValidator('112');
    expect(response.status).to.be.eql(200);
    expect(response.message).to.be.eql('It will be processed.');

    });  
    

});
