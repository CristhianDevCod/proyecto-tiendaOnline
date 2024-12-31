import { Routes } from '@angular/router';
import { ListadoComponent } from './layout/listado/listado.component';
import { FormularioComponent } from './layout/formulario/formulario.component';
import { PerdidoComponent } from './layout/perdido/perdido.component';
import { LoginComponent } from './layout/login/login.component';

export const routes: Routes = [
    {path: '', component:ListadoComponent},
    {path: 'listado', component:ListadoComponent},
    {path: 'agregar', component:FormularioComponent},
    {path: 'login', component:LoginComponent},
    {path: 'editar/:llave', component:FormularioComponent},
    {path: '**', component:PerdidoComponent},
];
