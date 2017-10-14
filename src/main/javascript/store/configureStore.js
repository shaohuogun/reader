import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

import {userReducer} from '../reducers/user'
import {readingListReducer, readingItemReducer} from '../reducers/read'
import {catalogReducer} from '../reducers/catalog'
import {channelStepperReducer, channelReducer, progressReducer} from '../reducers/channel'
import {paginationReducer, messageStepperReducer, messageReducer} from '../reducers/message'
import {ebookReducer} from '../reducers/ebook'

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  agreed: userReducer,
  readingLists: readingListReducer,
  readingItem: readingItemReducer,
  catalogs: catalogReducer,
  channelStepper: channelStepperReducer,
  channel: channelReducer,
  progress: progressReducer,
  messageStepper: messageStepperReducer,
  message: messageReducer,
  pagination: paginationReducer,
  ebook: ebookReducer
})

var logger = createLogger()

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, logger)
)

export default configureStore
