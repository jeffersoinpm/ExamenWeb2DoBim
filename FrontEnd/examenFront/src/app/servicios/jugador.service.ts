import {Injectable} from "@angular/core";
import {JugadoresInterface} from "../interfaces/jugadoresInterface";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JugadorService {

  public static jugadorSeleccionado: JugadoresInterface;
  constructor(private consulta: HttpClient) {
  }

  obtenerAllJugadores(){
    return this.consulta.get("http://localhost:1337/Jugador/mostrarJugadores");
  }

  obtenerJugadoresBusqueda(busqueda:string){
    return this.consulta.get('http://localhost:1337/Jugador/'+busqueda);
  }

}
