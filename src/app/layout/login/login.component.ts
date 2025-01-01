import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  passwordVissible: boolean = false;

  formularioControl = new FormGroup({
    correo: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    contrasena: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  constructor(private loginService: LoginService) { }

  //Funciones
  cambiarEstado(evento: Event) {
    evento.preventDefault();
    this.passwordVissible = !this.passwordVissible;
  }

  login() {
    if (this.formularioControl.invalid) {
      return;
    }
    //Se obtienen los valores del formulario
    const { correo, contrasena } = this.formularioControl.value;
    //se pasan los valores a la funcion de login
    this.loginService.login(correo!, contrasena!)
  }

}
