import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './store/configureStore'
import storeProvider from './store/storeProvider'

import Layout from './containers/Layout'
import PortalPage from './containers/PortalPage'
import ReadingListPage from './containers/ReadingListPage'
import ReadingListItemPage from './containers/ReadingListItemPage'
import ChannelPage from './containers/ChannelPage'
import MessagePage from './containers/MessagePage'
import EbookPage from './containers/EbookPage'
import EbookWizard from './containers/EbookWizard'

// Needed for onTouchTap
injectTapEventPlugin();

const Reader = ({store, history}) => (
  <Provider store={store}>
  <Router history={history}>
  <Layout>
  <Route exact path="/html" component={PortalPage}/>
  <Route path="/html/readinglist" component={ReadingListPage}/>
  <Route path="/html/readinglistitem" component={ReadingListItemPage}/>
  <Route path="/html/wizard" component={EbookWizard}/>
  <Route path="/html/channel" component={ChannelPage}/>
  <Route path="/html/message" component={MessagePage}/>
  <Route path="/html/ebook" component={EbookPage}/>
  </Layout>
  </Router>
  </Provider>
)

Reader.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Reader

storeProvider.init(configureStore({wizard: {
    finished: false,
    stepIndex: 0
  }}))
const store = storeProvider.getStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Reader store={store} history={history} />,
  document.getElementById('root')
)
