import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import Producto from '../../models/producto';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
})
export class FormularioComponent {
  llaveProducto: string | null = null;
  estado:String = 'Crear'

  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private productoSerice: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.siEditar()
    // validar si se quiere editar un producto
    if (this.llaveProducto) {
      this.estado = 'Editar'
      const producto = this.productoSerice.getProductoByLlave(this.llaveProducto);
      // si se encuentra el producto
      if (producto) {
        const { nombre, precio } = producto;
        // llenar los valores en el formulario
        this.formulario.patchValue({nombre, precio:precio.toString()})
      } else {
        console.error('No se encontro el producto')
      }
      //cambiar estado
    } else {
      this.estado = 'Crear'
    }
  }

  siEditar(){
    this.llaveProducto = this.route.snapshot.paramMap.get('llave');
  }

  restablecerVolver() {
    this.formulario.reset();
    this.router.navigate(['listado']);
  }

  OnSubmit() {
    // Se valida si el formulario es valido
    if (this.formulario.invalid) {
      console.error('El formulario es invalido');
      return;
    }

    if (this.llaveProducto) {
      const { nombre, precio } = this.formulario.value
      const producto = new Producto( nombre!, Number(precio));
      this.productoSerice.actualizarProducto(producto, this.llaveProducto)
      this.restablecerVolver();
      return;
    }

    // si es valido el formulario
    // const nuevoId: number = this.productoSerice.productos.length + 1;
    const { nombre, precio } = this.formulario.value;
    const nuevoProducto = new Producto( nombre!, Number(precio));
    this.productoSerice.agregarProducto(nuevoProducto);
    this.restablecerVolver();
  }
}
