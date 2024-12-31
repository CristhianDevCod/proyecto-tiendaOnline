import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import  Producto from '../../models/producto';
import { ProductoComponent } from "./producto/producto.component";
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    ProductoComponent,
    RouterModule
  ],
  templateUrl: './listado.component.html',
  styles: ``
})
export class ListadoComponent {
  productos: { [llave: string]: Producto } = {}
  productosSubscripcion: Subscription | null = null

  constructor(private productoSerive: ProductoService) {
  }

  ngOnInit(): void{
    this.cargarProductos();
    // Escuchar los cambios en la lista de productos
    this.productosSubscripcion = this.productoSerive.productosActualizados
      .subscribe((productos) => this.productos = productos)
  }

  cargarProductos() {
    this.productoSerive.listarProductos()
      .subscribe((productos: { [llave: string]: Producto }) => {
        this.productos = productos;
        this.productoSerive.setProductos(productos);
      })
  }

  obtenerLlaves(): string[]{
    if (this.productos) {
      return Object.keys(this.productos);
    } else {
      return []
    }
  }

  //cuando se termina de usar el componente se desuscribe al observable
  ngOnDestroy(): void{
    if (this.productosSubscripcion != null) {
      this.productosSubscripcion.unsubscribe();
    }
  }
}
