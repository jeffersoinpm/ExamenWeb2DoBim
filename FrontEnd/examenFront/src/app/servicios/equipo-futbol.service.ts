import {UsuariosInterface} from "../interfaces/usuario.interface";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EquipoFutbolInterface} from "../interfaces/equipoFutbolInterface";

@Injectable()
export class EquipoFutbolService {

  public static equipoFutbolSeleccionado: EquipoFutbolInterface;
  constructor(private consulta: HttpClient) {
  }

  obtenerAllEquiposFutbol(){
    return this.consulta.get('http://localhost:1337/EquipoFutbol/mostrarEquiposFutbol');
  }

  obtenerEquipoFutbolbusqueda(busqueda:string){
    return this.consulta.get('http://localhost:1337/EquipoFutbol/'+busqueda);
  }

}
