const responseToString = code => code.reduce((acc, item) => {
    acc += item;
    return acc;
}, '');

const calculator = (element, count) => {
    const sum = (count * parseInt(element));
    const response = sum;
    return response;
};

const checkDigit = codeElement => {
    if(codeElement > 9){
        const tenStage = Math.trunc(codeElement / 10);
        const unitStage = codeElement % 10;
        const newCodeElement = tenStage + unitStage;
        return checkDigit(newCodeElement);
    }
    return codeElement;
};

module.exports = {
    responseToString,
    calculator,
    checkDigit
}