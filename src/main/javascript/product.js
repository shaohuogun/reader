import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import storeProvider from './store/storeProvider'
import configureStore from './store/configureStore'
import Layout from './Layout'
import routes from './routes/product'

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

export default class Product extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <Layout style={layoutStyle}>
      {routes}
      </Layout>
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Product history={history} />,
  document.getElementById('root')
)