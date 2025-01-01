import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore"

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: 'AIzaSyC0txhgp8ruIbtAam1wCYzQAoKjFz35ta4',
    authDomain: 'tienda-online-18558.firebaseapp.com',
    databaseURL: 'https://tienda-online-18558-default-rtdb.firebaseio.com',
    projectId: 'tienda-online-18558',
    storageBucket: 'tienda-online-18558.firebasestorage.app',
    messagingSenderId: '717407483706',
    appId: '1:717407483706:web:e0234d0c3a0794ced9c203',
  };

  public auth: Auth;
  public firebase: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
  }
}
