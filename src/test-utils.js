import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import {initialState} from './store/undoRedo/undoRedoReducer';
import theme from './customTheme'
import { ThemeProvider } from '@material-ui/styles'


function render(
  ui, 
  { initState = initialState, store = createStore(reducer, initState), ...renderOptions
  } = {}
) {
    function Wrapper({ children }) {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>  
        </Provider>
      )
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}


// re-export everything
export * from '@testing-library/react'
// override render method
export { render }