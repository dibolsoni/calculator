
import {
    add,
    subtract,
    multiply,
    divide,
    round
} from 'lodash';

export const ROUND_N_TO_DECIMALS = 2;
export const MAX_N_HISTORY = 50;
export const DEFAULT_OPERATOR = '+';

export function hasDigits(digits) {
    return (digits && digits.length > 0);
}

export function getValueFromDigits(digits) {
    if (digits)
        return Number(digits.join(""));
    return 0;
}

export function getResult(fv, op, sv) {
    switch (op) {
        case '+':
            return round(add(fv, sv), ROUND_N_TO_DECIMALS);
        case '-': 
            return  round(subtract(fv,sv), ROUND_N_TO_DECIMALS);
        case '*': 
            return  round(multiply(fv,sv), ROUND_N_TO_DECIMALS);
        case '/': 
            return  round(divide(fv,sv), ROUND_N_TO_DECIMALS);
        default:
            return null;
    }
};

export function isDigitNumber(digit) {
    const numbersRegex = new RegExp(/^[0-9]$|^[.]?$/);
    return (numbersRegex.test(digit))
}

