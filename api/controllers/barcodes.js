const { firstCodeValidator, specificValidator } = require('../utils/validator');
const { makeCodeBank } = require('../domain/codeBank');


const checkBarCodes = (req, res) => {
    const code = req.query.code;
    const checkedCode = firstCodeValidator(code);
    const isValid = checkedCode['status'] === 200;
    if(isValid){
        const codeBank = makeCodeBank(code);
        const response = specificValidator(codeBank);
        return res.send(response)
    }
    return res.send(checkedCode);
};

module.exports = {
    checkBarCodes
};