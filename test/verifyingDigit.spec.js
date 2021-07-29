const expect = require('chai').expect;
const { checkDVFields, DVcalculator} = require('../api/utils/verifyingDigit');
const mockCode = '00193373700000001000500940144816060680935031';
const mockFieldsCode = '00190500954014481606906809350314337370000000100';
const mockCodeError = '00190373700000001000500940144816060680935031';
const mockCodeError2 = '00191311100000001000200540100016000080935031';



describe(':: ewally challenge test ::', () => {

  it('Check Digit verifyer test.', () => {
    const result = checkDVFields(mockFieldsCode, 0, 9);
    expect(result).to.be.eql(true);
    });

  it('Check Digit Verfyer Calculator test.', () => {
    const result = DVcalculator(mockCode);
    expect(result).to.be.eql(true);
    });

  it('Check Digit Verfyer Calculator false test.', () => {
    const result = DVcalculator(mockCodeError);
    expect(result).to.be.eql(false);
    });

  it('Check Digit Verfyer Calculator false 2 test.', () => {
    const result = DVcalculator(mockCodeError2);
    expect(result).to.be.eql(false);
    });    
    
});
