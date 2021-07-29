const expect = require('chai').expect;
const util = require('../api/utils/util');

describe(':: ewally challenge test ::', () => {

  it('Util calculator code test.', () => {
    const result = util.calculator('8', 2);
    expect(result).to.be.eql(16);
    });

  it('Util CheckDigit test.', () => {
    const checked = util.checkDigit(6);
    expect(checked).to.be.eql(6);
    });  
   
  it('Util CheckDigit test.', () => {
    const response = util.responseToString(['a','b']);
    expect(response).to.be.eql('ab');
    });  
    
});
