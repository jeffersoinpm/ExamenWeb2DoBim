import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {RutasApp} from "./app.routes";
import {RouterModule} from "@angular/router";
import { SeleccionComponent } from './seleccion/seleccion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PeticionComponent } from './peticion/peticion.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {HttpModule} from "@angular/http";
import { EquipoFutbolComponent } from './equipofutbol/equipo-futbol.component';
import { JugadorComponent } from './jugador/jugador.component';
import {JugadorService} from "./servicios/jugador.service";
import {UsuarioService} from "./servicios/usuario.service";
import {EquipoFutbolService} from "./servicios/equipo-futbol.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeleccionComponent,
    PerfilComponent,
    PeticionComponent,
    HomeComponent,
    UsuarioComponent,
    EquipoFutbolComponent,
    JugadorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      RutasApp,{
        useHash: true
      }
    )
  ],
  providers: [HomeComponent, JugadorService, UsuarioService, EquipoFutbolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
