
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
            return fv + sv;
        case '-': 
            return fv - sv;
        case '*': 
            return fv * sv;
        case '/': 
            return fv / sv;
        default:
            return null;
    }
};

export function isDigitNumber(digit) {
    const numbersRegex = new RegExp(/^[0-9]$|^[.]?$/);
    return (numbersRegex.test(digit))
}

