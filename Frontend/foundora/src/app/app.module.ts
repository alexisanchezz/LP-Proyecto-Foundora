import { SplitButtonModule } from 'primeng/splitbutton';
import { MegaMenuModule } from 'primeng/megamenu';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Modules
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api'; // Servicio añadido
import Lara from '@primeng/themes/lara';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'; 
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';

// Components
import { LoginComponent } from './login/login.component';
import { AreasComponent } from './areas/areas.component';
import { RegistroComponent } from './registro/registro.component';
import { ObjetosComponent } from './objetos/objetos.component';
import { ObjetosEncontradosComponent } from './objetosencontrados/objetosencontrados.component';
import { RecompensasComponent } from './recompensas/recompensas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TesoroComponent } from './tesoro/tesoro.component';



// Interceptors
import { TokenInterceptor } from '../service/token.interceptor';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    AreasComponent,
    LoginComponent,
    RegistroComponent,
    ObjetosComponent,
    ObjetosEncontradosComponent,
    InicioComponent,
    TesoroComponent,
    UsuarioComponent,
    RecompensasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // PrimeNG Modules
    CardModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    TableModule,
    SelectModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    CarouselModule,
    MegaMenuModule,
    SplitButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          colorScheme: 'light',
          primaryColor: '#00bcd4'
        }
      }
    }),
    MessageService, // Servicio añadido aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }