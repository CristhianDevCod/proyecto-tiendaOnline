import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string|null = null;

  constructor(
    private router: Router,
    private firebaseService:FirebaseService
  ) { }


  login(email: string, password: string):void {
    // se utiliza el metodo de autenticación
    const auth = this.firebaseService.auth;
    // Se realiza login utilizando una función de firebase auth
    signInWithEmailAndPassword(auth, email, password) // se maneja la promesa
      .then(() => {
        // Se valida si se pudo obtener el token
        auth.currentUser?.getIdToken() // operador opcional ? en caso de que el usuario actual sea null o undefined
          .then((token) => { // se asigna el token a el atributo de clase
            this.token = token;
            this.router.navigate(['/'])
          })
      }) // este catch procesará el error de la promesa externa
      .catch((err) => console.error('No se pudo autenticar: ', err))
  }

  //Verificacion de usuario autenticado
  isAutenticado():boolean {
    return this.token != null;
  }

  getIdToken():string|null {
    return this.token;
  }

  //método para cerrar sesión
  logout() {
    const auth = this.firebaseService.auth;
    auth.signOut().then(() => { // regresa una promesa
      this.token == null; //Restablece el token al cerrar sesión
      this.router.navigate(['login']);
    })
      .catch(err => console.error('Error en logout: ',err));
  }
}
