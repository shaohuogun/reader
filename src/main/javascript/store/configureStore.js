import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

import {signupReducer} from '../reducers/entry'
import {readingStepperReducer, readingListReducer, readingItemReducer, messageStepperReducer, catalogReducer, messageReducer,
  channelStepperReducer, channelReducer, progressReducer} from '../reducers/tool'
import {ebookReducer, paginationReducer} from '../reducers/mine'

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  agreed: signupReducer,
  readingStepper: readingStepperReducer,
  readingLists: readingListReducer,
  readingItem: readingItemReducer,
  messageStepper: messageStepperReducer,
  catalogs: catalogReducer,
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
