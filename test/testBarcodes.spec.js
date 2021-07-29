const httpMocks = require('node-mocks-http');
const rewire = require('rewire');
const expect = require('chai').expect;

const barcodeController = rewire('../api/controllers/barcodes');
const mockValidatedCode = require('./mocks/mockCheckedCode.json');
const mockResponse = require('./mocks/mockPayloadResponse.json');
const mockCode = '00190500954014481606906809350314337370000000100';
const mockCodeError = '0019050095401448160690680935031437370000000100';
const mockInvalidCode = require('./mocks/mockInvalidCode.json');

describe(':: ewally challenge test ::', () => {
  const req = httpMocks.createRequest({
    method:'GET',
    url:'/v1/barcodes',
    query: {
        code:'00190500954014481606906809350314337370000000100'
    }
  });

  const res = httpMocks.createResponse();

  it('should return a checked barcode result.', () => {
    barcodeController.__set__('validator' , {
        checkBarCodes: (code) => {
            if(code === mockCode){
                return mockValidatedCode;
            }
            if(code === mockCodeError){
              return mockInvalidCode;
          }
      }
    });

    barcodeController.checkBarCodes(req, res);
    const data = res._getData();

    expect(data).to.be.eql(mockResponse);
  });
});
