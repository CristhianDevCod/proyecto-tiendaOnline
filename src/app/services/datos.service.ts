import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Producto from '../models/producto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  url: string = 'https://tienda-online-18558-default-rtdb.firebaseio.com/';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  listarProductos(): Observable<{ [llave: string]: Producto }> {
    //El token se utiliza cada vez que se realiza una peticion a la base de datos
    const token = this.loginService.getIdToken(); // se concatena a la url de la petición
    const url_listar = `${this.url}datos.json?auth=${token}`;
    return this.httpClient.get<{ [llave: string]: Producto }>(url_listar);
  }

  guardarProducto(producto: Producto): Observable<any> {
    const token = this.loginService.getIdToken(); // se concatena a la url de la petición
    const url_guardar = `${this.url}datos.json?auth=${token}`;
    // Se genera el valor de la llave de forma automatica
    return this.httpClient.post(url_guardar, producto);
  }

  modificarProducto(producto: Producto, llave: string): Observable<any> {
    const token = this.loginService.getIdToken(); // se concatena a la url de la petición
    return this.httpClient.put(this.seleccionPorLlave(llave, token!), producto);
  }

  eliminarProducto(llave: string): Observable<any> {
    const token = this.loginService.getIdToken(); // se concatena a la url de la petición
    return this.httpClient.delete(this.seleccionPorLlave(llave, token!));
  }

  //Cadena formateada
  seleccionPorLlave(llave: string, token:string): string {
    return `${this.url}datos/${llave}.json?auth=${token}`;
  }
}
