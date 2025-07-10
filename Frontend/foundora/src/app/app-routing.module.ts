import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AreasComponent } from './areas/areas.component';
import { ObjetosComponent } from './objetos/objetos.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component'; 
import { TesoroComponent } from './tesoro/tesoro.component';  
import { AuthGuard } from '../service/auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },  // Redirección exacta
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { 
    path: 'areas',
    component: AreasComponent,
    canActivate: [AuthGuard]   
  },   
  { 
    path: 'objetos',
    component: ObjetosComponent,
    canActivate: [AuthGuard] 
  }, 
  { 
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard] 
  },
    { 
    path: 'tesoro',
    component: TesoroComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/inicio' }  // Ruta comodín para cualquier otra URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
