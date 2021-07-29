const { calculator, checkDigit } = require('./util');

const translateCode = code => code.map((item, i) => {
    if(i % 2 === 0){
        const current = parseInt(item) * 2;
        return current;
    }
    const current = parseInt(item) * 1;
    return current;
});

const makeSumFields = arr => arr.reduce((acc, item) => {
    return acc += checkDigit(item);
}, 0);

const makeDVCode = n => {
    const tenStage = Math.trunc(n/10);
    const nextTenStage = (tenStage + 1) * 10;
    const response = nextTenStage - n;
    return response;
};

const DVcalculator = code => {
    const codeDV = code.slice(4,5);
    const splitCode = code.split('');
    const firstPart = splitCode.slice(0,4)
    const secondPart = splitCode.slice(5,44);
    const splitedCode = firstPart.concat(secondPart);
    const runCount = splitedCode.reverse();
    let count = 2;
    let acc = 0;
    for(const element of runCount){
        if(count < 9){
            acc += calculator(element, count);
            count ++;
        } else{
            acc += calculator(element, count);
            count = 2;
        }
    }
    const rest = acc % 11;
    const digit = 11 - rest;

    if(digit === 0 || digit === 10 || digit === 11){
        return '1' === codeDV;
    }

    return digit.toString() === codeDV && codeDV !== '0';
};


const checkDVFields = (code, start, end) => {
    const fieldCode = code.slice(start, end);
    const DVField = code.slice(end, end + 1);
    const splitedCode = fieldCode.split('').reverse();
    const translatedCode = translateCode(splitedCode);
    const codeMultiplier = translatedCode.reverse();
    const sumFields = makeSumFields(codeMultiplier);
    const DVcode = makeDVCode(sumFields);
    return DVcode.toString() === DVField.toString();
};

module.exports = {
    DVcalculator,
    checkDVFields
};

// 00190500954014481606906809350314337370000000100