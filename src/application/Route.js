/**
 * Created by HieuVP on 1/1/17.
 * @flow
 */
import React from 'react';
import {
  Route,
  IndexRedirect
} from 'react-router';
import { store } from './configureStore';
import navigator from './Navigator';
import Application from './Application';
import LoginContainer, { loginPath } from '../scene/login/LoginContainer';
import HomeContainer, { homePath } from '../scene/home/HomeContainer';
import NoMatchContainer from '../scene/error/page-not-found/NoMatchContainer';
import type { UserState } from '../domain/user/UserReducer';
import { userReducerName } from '../domain/user/UserReducer';

export type Location = {
  pathname: string,
  query: any,
  search: string,
  hash: string,
};

export type Router = {
  push: (string) => void,
  replace: (string) => void,
  go: (number) => void,
  goBack: () => void,
  goForward: () => void,
  setRouteLeaveHook: Function,
  isActive: Function,
};

const requireLogin = (callback: Function) => {
  const state = store.getState();
  const userState: UserState = state[userReducerName];
  if (!userState.loggedUser) {
    const redirectLocation: Location = state.routing.locationBeforeTransitions;
    navigator.replaceLogin(redirectLocation);
  }
  callback();
};

export default (
  <Route path="/" component={Application}>
    <IndexRedirect to={homePath} />

    <Route onEnter={(nextState, replaceState, callback) => requireLogin(callback)}>
      <Route path={homePath} component={HomeContainer} />
    </Route>

    <Route path={loginPath} component={LoginContainer} />

    <Route path="*" component={NoMatchContainer} />
  </Route>
);
