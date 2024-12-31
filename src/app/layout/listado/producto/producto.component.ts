import { Component } from '@angular/core';
import { Input } from '@angular/core';
import Producto from '../../../models/producto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto.component.html',
  styles: ``,
})
export class ProductoComponent {
  @Input() producto!: Producto;
  @Input() llaveInput!: string;

  constructor(
    private productoService: ProductoService,
    private datosService:DatosService
  ) { }

  eliminarProducto(llave:string) {
    this.productoService.eliminarProducto(llave);
  }
}
