require('dotenv').config();
const { add, format } = require('date-fns');
const { DVcalculator, checkDVFields } = require('../utils/verifyingDigit');


const makeField01 = code => {
    const field01 = code.slice(0,9);
    const factorA = field01.slice(0,3);
    const factorB = field01.slice(3,4);
    const factorC = field01.slice(4,9);
    return {
        factorA: factorA,
        factorB: factorB,
        factorC: factorC
    };
};

const makeCommonField = (code, start, end) => code.slice(start, end);
const makeFactorK = code => code.slice(32,33);

const makeField05 = code => {
    return code.slice(37,47);
};

const makeExpDate = factor => {
    const diffFactor = parseInt(factor) - process.env.FACTOR_NUMBER;
    const dateFactor = process.env.DATE_FACTOR;
    const diffDate = add(new Date(dateFactor),{days:diffFactor});
    const expDate = add(diffDate, {days:1});
    return format(expDate, 'yyyy-MM-dd');
};

const makeAmount = value => parseInt(value/100).toFixed(2);

const makeCodeBank = (code) => {
    const field01 = makeField01(code);
    const DVField01 = checkDVFields(code, 0, 9);
    const field02 = makeCommonField(code, 10, 20);
    const DVField02 = checkDVFields(code, 10, 20);
    const field03 = makeCommonField(code, 21 , 31);
    const DVField03 = checkDVFields(code,21,31);
    const field04 = makeCommonField(code, 33, 37);
    const factorK = makeFactorK(code);
    const field05 = makeField05(code);
    const barCode = field01['factorA'] + field01['factorB']
                    + factorK + field04 + field05 + field01['factorC']
                    + field02  + field03;
    const amount = makeAmount(field05);
    const date = makeExpDate(field04);
    const DVcode = DVcalculator(barCode);
    return {
        data:{
            barCode: barCode,
            amount: amount,
            expirationDate: date
        },
        Errors:{
            field01: !DVField01,
            field02: !DVField02,
            field03: !DVField03,
            factorK: !DVcode
        }
        
    };
};

module.exports = {
    makeCodeBank
};
