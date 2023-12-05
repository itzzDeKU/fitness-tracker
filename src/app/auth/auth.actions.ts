import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_USER_EMAIL = '[Auth] Set User Email';
export const CLEAR_USER_EMAIL = '[Auth] Clear User Email';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUserEmail implements Action {
  readonly type = SET_USER_EMAIL;

  constructor(public payload: string) {} // Add a constructor to accept payload
}

export class ClearUserEmail implements Action {
  readonly type = CLEAR_USER_EMAIL;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | SetUserEmail | ClearUserEmail;
