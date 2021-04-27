import { render } from '../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Operators from '.'
import BasicMathOperators from './BasicMathOperators';

describe('Operators', () => {
    describe('BasicMath', () => {
        test('render', () => {
            const {getByText} = render(<Operators />)
            const BasicMathOperatorsSymbols = ['+', '-', '*', '/'];
            BasicMathOperatorsSymbols.forEach(symbol => {
                expect(getByText(symbol).textContent).toBe(symbol);
            });
        })

        test('render with more operators types', () => {
            const {getAllByText} = render(<Operators operators={[BasicMathOperators, BasicMathOperators]} />)
            const BasicMathOperatorsSymbols = ['+', '-', '*', '/'];
            BasicMathOperatorsSymbols.forEach(symbol => {
                expect(getAllByText(symbol)).toHaveLength(2);
            });
        })

        test('adding more operators types after rendered', () => {
            const {getAllByText} = render(<Operators operators={[BasicMathOperators]} />)
            const BasicMathOperatorsSymbols = ['+', '-', '*', '/'];
            BasicMathOperatorsSymbols.forEach(symbol => {
                expect(getAllByText(symbol)).toHaveLength(1);
            });
            //adding another operators type to render
            render(<Operators operators={[BasicMathOperators]} />)
            BasicMathOperatorsSymbols.forEach(symbol => {
                expect(getAllByText(symbol)).toHaveLength(2);
            });

        })
    })
})