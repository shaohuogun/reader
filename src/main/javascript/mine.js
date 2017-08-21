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

import MineLayout from './layouts/mine/MineLayout'
import routes from './routes/mine'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

storeProvider.init(configureStore({
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

export default class Mine extends Component {
  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <MineLayout style={layoutStyle}>
      {routes}
      </MineLayout>
      </Router>
      </Provider>
    )
  }
}

Mine.propTypes = {
  history: PropTypes.object.isRequired
}

ReactDOM.render(
  <Mine history={history} />,
  document.getElementById('root')
)
