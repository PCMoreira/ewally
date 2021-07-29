const { mapErrors } = require('./mapError');

const specificValidator = payload => {
    const listErrors = payload.Errors;
    const messages = Object.keys(listErrors).map(err => {
        if(listErrors[err]){
            return mapErrors[err];
        }
        return null;
    });
    const checkedMessages = messages.filter(msg => msg !== null);
    if(checkedMessages.length > 0){
        const response = checkedMessages.reduce((acc, item) => {
            acc = ` ${item}`;
            return acc;
        }, '');
        return {
            status: 400,
            Error:response
        };
    }
    return {
        status: 200,
        ... payload.data
    };
};

const firstCodeValidator = code => {
    const resultStatus = !isNaN(code);
    if(resultStatus){
        return {
            status: 200,
            message: 'It will be processed.'
        }
    }
    return {
        status: 400,
        message: 'The code format is invalid. Please, check your code.'
    }
  
};

module.exports = {
    firstCodeValidator,
    specificValidator
}
