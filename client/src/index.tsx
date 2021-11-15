import ReactDOM from 'react-dom'
import React, { Suspense } from 'react'
import App from 'app/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Loading } from 'app/Components/Loading/Loading'
import { store } from 'app/store'
import { StoreContext } from 'redux-react-hook'
import './index.scss'

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
        <Router>
          <App />
        </Router>
      </StoreContext.Provider>
    </Provider>
  </Suspense>,
  document.getElementById('root')
)
