import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'

import HomeLayout from './layout/home/HomeLayout'
import routes from './routes/home'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

storeProvider.init(configureStore({
  ebookStepper: {
    finished: false,
    stepIndex: 0
  },
  progress: 0,
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

export default class Home extends Component {
  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <HomeLayout style={layoutStyle}>
      {routes}
      </HomeLayout>
      </Router>
      </Provider>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired
}

ReactDOM.render(
  <Home history={history} />,
  document.getElementById('root')
)
