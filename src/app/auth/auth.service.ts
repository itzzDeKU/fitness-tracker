import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
    // Call the auth listener when the service is created
    this.initAuthListener();
  }

  initAuthListener() {
    const auth = getAuth();

    // Use onAuthStateChanged to listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        this.store.dispatch(new Auth.SetAuthenticated());
        this.store.dispatch(new Auth.SetUserEmail(user.email));
        this.router.navigate(['/training']);
      } else {
        // User is not authenticated
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new Auth.ClearUserEmail());
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, authData.email, authData.password)
      .then((res) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(res);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    const auth = getAuth();

    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading())
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then()
      .catch((error) => {
        console.error('Logout Failed', error);
      });
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
