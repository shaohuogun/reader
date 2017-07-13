import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'
import routes from './routes'

import Layout from './Layout'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
}

storeProvider.init(configureStore({
  wizard: {
    finished: false,
    stepIndex: 0
  },
  progress: 0,
  pagination: {}
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

function createElements (history) {
  const elements = [
    <Router key="router" history={history} children={routes} />
  ]

  // if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  //   const DevTools = require('./DevTools')
  //   elements.push(<DevTools key="devtools" />)
  // }

  return elements
}

export default class UserCenter extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider key="provider" store={store}>
      <Layout style={layoutStyle}>
      {createElements(this.props.history)}
      </Layout>
      </Provider>
    )
  }
}

ReactDOM.render(
  <UserCenter history={history} />,
  document.getElementById('root')
)
