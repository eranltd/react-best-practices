/**
 * Created by HieuVP on 12/30/16.
 * @flow
 */
import { Disposable } from 'rx';
import type {
  Action,
  ThunkAction
} from '../../application/Action';
import * as ActionType from '../../application/Action';
import handleError from '../../domain/error/handleError';
import type { User } from '../../domain/user/User';
import userService from '../../domain/user/UserService';

const disposables: [Disposable] = [];

export function signIn(onCompleted: () => void): ThunkAction {
  return (dispatch, getState) => {
    disposables.push(userService.signInWithPopup()
      .subscribe({
        onNext: (user: ?User) => (
          dispatch({
            type: ActionType.UPDATE_LOGGED_USER,
            user,
          })),
        onError: error => handleError({error, dispatch, getState}),
        onCompleted,
      }));
  };
}

export function terminateDisposables(): Action {
  disposables.forEach(disposable => disposable.dispose());
  disposables.splice(0, disposables.length);
  return {
    type: ActionType.TERMINATE_DISPOSABLES,
  };
}

export type LoginAction = {
  signIn: typeof signIn,
  terminateDisposables: typeof terminateDisposables,
};
