import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Producto from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  url: string = 'https://tienda-online-18558-default-rtdb.firebaseio.com/';
  
  seleccionPorLlave(llave:string):string {
    return `${this.url}datos/${llave}.json`;
  }

  constructor(private httpClient: HttpClient) {}

  listarProductos(): Observable<{ [llave: string]: Producto }> {
    return this.httpClient.get<{ [llave: string]: Producto }>(
      this.url + 'datos.json'
    );
  }

  guardarProducto(producto: Producto): Observable<any> {
    // Se genera el valor de la llave de forma automatica
    return this.httpClient.post(`${this.url}datos.json`, producto);
  }

  modificarProducto(producto: Producto, llave: string): Observable<any> {
    return this.httpClient.put(this.seleccionPorLlave(llave), producto);
  }

  eliminarProducto(llave:string):Observable<any> {
    return this.httpClient.delete(this.seleccionPorLlave(llave));
  }
}
