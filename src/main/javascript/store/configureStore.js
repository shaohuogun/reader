import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

import {readingStepperReducer, readingItemReducer, ebookStepperReducer, channelReducer, progressReducer} from '../reducers/tool'
import {paginationReducer, ebookReducer} from '../reducers/mine'

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  readingStepper: readingStepperReducer,
  readingItem: readingItemReducer,
  ebookStepper: ebookStepperReducer,
  channel: channelReducer,
  progress: progressReducer,
  pagination: paginationReducer,
  ebook: ebookReducer
})

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore
