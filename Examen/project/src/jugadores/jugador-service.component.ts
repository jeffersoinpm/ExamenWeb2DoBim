import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {JugadorEntity} from "./jugadorEntity";
import {Like, Repository} from "typeorm";
import {Equipo_futbolEntity} from "../equipo_futbol/equipo_futbolEntity";
import {JugadorData} from "./jugadorData";

@Component()
export class JugadorService {

    constructor(
        @InjectRepository(JugadorEntity)
        private readonly jugadorRepository: Repository<JugadorEntity>
    ){}
    jugadores: Jugador[] = [];

    //Metodo Listar Todos los jugadores
    async  listarJugadores(): Promise<JugadorEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.jugadorRepository.find());
    }


    crearJugador(jugador: Jugador){
        const jug = new JugadorEntity();

        jug.numeroCamiseta = jugador.numeroCamiseta;
        jug.nombreCamiseta = jugador.nombreCamiseta;
        jug.nombreCompletoJugador = jugador.nombreCompleto;
        jug.poderEspecialDos = jugador.poderEspecialDos;
        jug.fechaIngresoEquipo = new Date(jugador.fechaIngreso);
        jug.goles = jugador.goles;
        jug.id_equipo_futbol = jugador.equipoFutbolId;
        jug.img_jug = jugador.img_jug;

        this.jugadorRepository.save(jug);
    }

    crearTodosJugadores(){
        for (var indice in JugadorData){
            const med = new JugadorEntity();
            med.numeroCamiseta = JugadorData[indice].numeroCamiseta;
            med.nombreCamiseta = JugadorData[indice].nombreCamiseta;
            med.nombreCompletoJugador = JugadorData[indice].nombreCompletoJugador;
            med.poderEspecialDos = JugadorData[indice].poderEspecialDos;
            med.fechaIngresoEquipo = new Date(JugadorData[indice].fechaIngresoEquipo);
            med.goles = parseInt(JugadorData[indice].goles);
            med.img_jug = JugadorData[indice].img_jug;

            this.jugadorRepository.save(med);
        }
    }

    async buscarJugLike(name: string): Promise<JugadorEntity[]> {

        return (await this.jugadorRepository.find({nombreCamiseta:Like('%'+name+'%')}));
    }
    //Metodo obtener un jugador
    obtenerUno(jugadorID){
        console.log(this.jugadores[jugadorID]);
        return this.jugadores[jugadorID];
    }

    //Metodo editar un jugador
    editarUno(jugadorID, numeroCamiseta, nombreCamiseta, nombreCompleto, poderEspecialDos, fechaIngresoEquipo, goles, equipoFutbolId){
        let jugadorActualizado = this.obtenerUno(jugadorID);

        jugadorActualizado.numeroCamiseta = numeroCamiseta;
        jugadorActualizado.nombreCamiseta = nombreCamiseta;
        jugadorActualizado.nombreCompleto = nombreCompleto;
        jugadorActualizado.poderEspecialDos = poderEspecialDos;
        jugadorActualizado.fechaIngreso = fechaIngresoEquipo;
        jugadorActualizado.goles = goles;
        jugadorActualizado.equipoFutbolId = equipoFutbolId;

        return jugadorActualizado;
    }

}
export class Jugador {
    constructor(
        public numeroCamiseta:number,
        public nombreCamiseta:string,
        public nombreCompleto:string,
        public poderEspecialDos:string,
        public fechaIngreso:string,
        public goles:number,
        public equipoFutbolId:Equipo_futbolEntity,
        public img_jug:string
    ){};
}