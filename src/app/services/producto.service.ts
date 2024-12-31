import { EventEmitter, Injectable } from '@angular/core';
import Producto from '../models/producto';
import { DatosService } from './datos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  productos: { [llave: string]: Producto } = {};
  //Observable para notificar cambios
  productosActualizados = new Subject<{ [llave: string]: Producto }>();

  constructor(private datosService: DatosService) {}

  listarProductos() {
    return this.datosService.listarProductos();
  }

  eliminarProducto(llave: string) {
    this.datosService.eliminarProducto(llave).subscribe(() => {
      this.refrescarProductos()
    })
  }

  actualizarProducto(producto: Producto, llave: string) {
    this.datosService.modificarProducto(producto, llave)
      .subscribe(() => {
        this.refrescarProductos();
      })
  }

  agregarProducto(producto: Producto): void {
    this.datosService.guardarProducto(producto).subscribe(() => {
      this.refrescarProductos();
    });
  }

  private refrescarProductos() {
    this.listarProductos().subscribe(
      (productos: { [llave: string]: Producto }) => {
        this.setProductos(productos);
      }
    );
  }

  setProductos(productos: { [llave: string]: Producto }) {
    this.productos = productos;
    this.productosActualizados.next(this.productos); // Emite la actualizacion de la lista
  }

  getProductoByLlave(llave: string): Producto | undefined {
    return this.productos[llave];
  }
}
