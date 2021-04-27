
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

export function removeLastDigit(state){
    if (hasDigits(state)){
        state.digits.pop();
    }
    return state;
}




// function getResult(first_value, operator, second_value){
//     if (!first_value || !second_value)
//         return null;
//     switch (operator) {
//         case '+': return first_value + second_value;
//         case '-': return first_value - second_value;
//         case '/': return first_value / second_value;
//         case '*': return first_value * second_value;
//     default:
//         return null;
//     }
// }


// export const caseHandleEqual = (state) => {
//     const numberDigits = Number(state.digits.join(""));
//     if (!state.operator) {
//         state.operator = !state.last_operator ? '+' : state.last_operator;
//         if (!state.first_value) state.first_value = numberDigits;
//     }
//     const {first_value, operator} = state;
//     const result = getResult(first_value, operator, numberDigits);
//     return {
//         ...state, 
//         first_value: result,
//         display: result, 
//         result: result,
//         last_operator: operator
//     }
// }