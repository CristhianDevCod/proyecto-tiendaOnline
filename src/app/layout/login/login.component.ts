import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

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
    correo: new FormControl('', [Validators.email, Validators.required]),
    contrasena: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  cambiarEstado(evento: Event) {
    evento.preventDefault();
    this.passwordVissible = !this.passwordVissible;
  }
}
