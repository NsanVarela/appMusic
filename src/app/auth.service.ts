import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // état de la connexion
  private _authState: boolean = false;

  constructor(private router: Router) {
    // Observable il teste si l'utilisateur est connecté
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this._authState = true;
      } else {
        this._authState = null;
      }
    });
  }

  get authState(): boolean {
    return this._authState;
  }

  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  isConnected() {
    return firebase.auth().currentUser ? true : false;
  }

  logout() {
    firebase.auth().signOut().then(
      () => this.router.navigate([`/albums`], { queryParams: { message: `Success logout` } })
    );
  }
}
