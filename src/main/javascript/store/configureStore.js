import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

import {wizardReducer, progressReducer, channelReducer} from '../reducers/service'
import {paginationReducer, ebookReducer} from '../reducers/mine'

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  wizard: wizardReducer,
  progress: progressReducer,
  channel: channelReducer,
  pagination: paginationReducer,
  ebook: ebookReducer
})

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore
