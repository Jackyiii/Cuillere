require("react-hot-loader/patch")

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './components/app.jsx'


import rootReducer from './reducers';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => {
    render(App)
  })

  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  })
}
