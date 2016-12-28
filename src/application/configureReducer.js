// @flow
/**
 * Created by HieuVP on 12/28/16.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducers } from './Scene';

export default function configureReducer() {
  return combineReducers({
    ...reducers,
    routerReducer,
  });
}
