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

import EntryLayout from './components/layout/entry/EntryLayout'
import routes from './routes/entry'

// Needed for onTouchTap
injectTapEventPlugin();

const layoutStyle = {
  margin: '0 auto',
  width: '400px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

storeProvider.init(configureStore({
  agreed: false,
}))

const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

export default class Entry extends Component {
  render () {
    return (
      <Provider key="provider" store={store}>
      <Router key="router" history={this.props.history} >
      <EntryLayout style={layoutStyle}>
      {routes}
      </EntryLayout>
      </Router>
      </Provider>
    )
  }
}

Entry.propTypes = {
  history: PropTypes.object.isRequired
}

ReactDOM.render(
  <Entry history={history} />,
  document.getElementById('root')
)
