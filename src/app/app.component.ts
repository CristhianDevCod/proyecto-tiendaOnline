import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  titulo = 'Tienda Online';
  constructor(private loginService: LoginService) {}

  isAutenticado():boolean {
    return this.loginService.isAutenticado();
  }

  salir() {
    this.loginService.logout()
  }
}
