import { FormControl, FormGroup } from "@angular/forms";

export default class Producto {
    constructor(
        public nombre: string,
        public precio: number
    ) { }
}