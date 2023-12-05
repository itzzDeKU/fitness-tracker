import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_EMAIL, CLEAR_USER_EMAIL } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  userEmail: string | null;
}

const initialState: State = {
  isAuthenticated: false,
  userEmail: null,
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    case CLEAR_USER_EMAIL:
      return { ...state, userEmail: null };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

export const selectAuthState = createFeatureSelector<State>('auth');
export const getUserEmail = createSelector(
  selectAuthState,
  (state: State) => state.userEmail
);
