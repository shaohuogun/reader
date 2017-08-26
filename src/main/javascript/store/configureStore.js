import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

import {readingStepperReducer, readingReducer, messageStepperReducer, messageReducer,
  channelStepperReducer, channelReducer, progressReducer} from '../reducers/tool'
import {ebookReducer, paginationReducer} from '../reducers/mine'

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  readingStepper: readingStepperReducer,
  readingItem: readingReducer,
  messageStepper: messageStepperReducer,
  message: messageReducer,
  channelStepper: channelStepperReducer,
  channel: channelReducer,
  ebook: ebookReducer,
  progress: progressReducer,
  pagination: paginationReducer
})

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore
