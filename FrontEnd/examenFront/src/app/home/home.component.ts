import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../servicios/usuario.service";
import {EquipoFutbolService} from "../servicios/equipo-futbol.service";
import {JugadorService} from "../servicios/jugador.service";
import {UsuariosInterface} from "../interfaces/usuario.interface";
import {EquipoFutbolInterface} from "../interfaces/equipoFutbolInterface";
import {JugadoresInterface} from "../interfaces/jugadoresInterface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios:Array<UsuariosInterface>
  usuarioAux:Array<UsuariosInterface>
  equiposFutbol:Array<EquipoFutbolInterface>
  equiposFutbolAux:Array<EquipoFutbolInterface>
  jugadores: Array<JugadoresInterface>
  jugadoresAux: Array<JugadoresInterface>

  constructor(private _httpClient: HttpClient,
              private _router: Router,
              private servicioUser: UsuarioService,
              private servicioEquipoFutbol: EquipoFutbolService,
              private servicioJug: JugadorService
  ) {}
  userLike = '';

  @Input() counter:number = 0;
  @Input() counter2:number = 0;
  @Input() counter3:number = 0;
  @Input() estado:boolean =false;


  ngOnInit() {

    this.usuarios = [];
    this.equiposFutbol = [];
    if (this.userLike.length === 0) {
      if (this.estado == true) {
        const observableUsuarios$ = this.servicioUser.obtenerAllUser();
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
            this.obtenerUsuarios(this.usuarios);
          },

        );

        const observablePacientes$ = this.servicioEquipoFutbol.obtenerAllEquiposFutbol();
        observablePacientes$.subscribe(
          (results:any) => {
            this.equiposFutbol = results;
            this.obtenerEquiposFutbol(this.equiposFutbol);
          },

        );

        const observableMedicamentos$ = this.servicioJug.obtenerAllJugadores();
        observableMedicamentos$.subscribe(
          (results:any) => {
            this.jugadores = results;
            this.obtenerJug(results);
          },
          (error) => {
            console.log('Error', error);
          },
        );

      }this.estado = true;

    } else {
      this.estado = false;

      const observableUsuariosLike$ = this.servicioUser.obtenerUserbusqueda(this.userLike);
      observableUsuariosLike$.subscribe(
        (results:any)=>{
          this.usuarios = results;
          if(this.usuarios.length ===  undefined){
            console.log('dkmsfnsdfndsk')
            const observableUsuariosLike$ = this.servicioUser.obtenerAllUser();
            observableUsuariosLike$.subscribe(
              (results:any)=>{
                this.usuarios = results;
                this.obtenerUsuarios(results);
              });
          }
          else{
            this.usuarios = results;
            this.obtenerUsuarios(results);
          }
        }
      );

      const observablePacLike$ = this.servicioEquipoFutbol.obtenerEquipoFutbolbusqueda(this.userLike);
      observablePacLike$.subscribe(
        (results:any)=>{
          this.equiposFutbol = results;
          if(this.equiposFutbol.length === undefined){
            const observablePacLike$ = this.servicioEquipoFutbol.obtenerAllEquiposFutbol();
            observablePacLike$.subscribe(
              (results:any)=>{
                this.equiposFutbol = results;
                this.obtenerEquiposFutbol(results);
              });
          }else{
            this.equiposFutbol = results;
            this.obtenerEquiposFutbol(results);
          }
        }
      );

      const observableMedLike$ = this.servicioJug.obtenerJugadoresBusqueda(this.userLike);
      observableMedLike$.subscribe(
        (results:any)=>{
          this.jugadores = results;
          if(this.jugadores.length === undefined){
            const observableMedLike$ = this.servicioJug.obtenerAllJugadores();
            observableMedLike$.subscribe(
              (results:any)=> {
                this.jugadores = results;
                this.obtenerJug(results);
              });
          }else{
            this.jugadores = results;
            this.obtenerJug(results);
          }
        }
      );

    }

  }

  obtenerUsuarios(result){
    this.usuarioAux = result;
  }
  obtenerEquiposFutbol(result){
    this.equiposFutbolAux=result;

  }

  obtenerJug(result){
    this.jugadoresAux=result;
  }

  aumentarContador(){
    this.counter = this.counter + 1;
    this.cargar(this.counter);
  }
  disminuirContador(){
    this.counter = this.counter - 1;
    this.cargar(this.counter);
  }

  cargar(valor1:number){
    this.usuarioAux = this.usuarios.slice(valor1*4, this.usuarios.length);
  }


  cargar1(valor1:number){
    this.equiposFutbolAux = this.equiposFutbol.slice(valor1*2, this.equiposFutbol.length);
  }

  cargar2(valor1:number){
    this.jugadoresAux = this.jugadores.slice(valor1*4, this.jugadores.length);
  }


  aumentarContador1(){
    this.counter2 = this.counter2 + 1;
    this.cargar1(this.counter2);
  }
  disminuirContador1(){
    this.counter2 = this.counter2 - 1;
    this.cargar1(this.counter2);
  }

  aumentarContador2(){
    this.counter3 = this.counter3 + 1;
    this.cargar2(this.counter3);
  }
  disminuirContador2(){
    this.counter3 = this.counter3 - 1;
    this.cargar2(this.counter3);
  }
}



