import { render } from '../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Numbers from '.'

describe('Numbers from 0-9 and .', () => {
    test('renders the numbers', () =>{
        const { getByText } = render(<Numbers />);
        for (let index = 0; index < 10; index++) {
            expect(getByText(index)).toBeInTheDocument();
        }
        expect(getByText('.')).toBeInTheDocument();
    })
})

