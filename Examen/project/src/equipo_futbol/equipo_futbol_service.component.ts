import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Like, Repository} from "typeorm";
import {Equipo_futbolEntity} from "./equipo_futbolEntity";
import {Equipo_FutbolData} from "./equipo_FutbolData";

@Component()

export class Equipo_FutbolService {

    constructor(
        @InjectRepository(Equipo_futbolEntity)
        private readonly equipoFutbolRepository: Repository<Equipo_futbolEntity>
    ){}
    equiposFutbol: EquipoFutbol[] = [];

    //Metodo Listar Todos los equipos de futbol
    async listarEquiposFutbol(): Promise<Equipo_futbolEntity[]>{
        //console.log(await this.equipoFutbolRepository.find());
        return (await this.equipoFutbolRepository.find());
    }

    //Metodo Crear equiposFutbol
    crearEquipoFutbol(equipoFutbol: EquipoFutbol){

        const equip = new Equipo_futbolEntity();
        equip.nombres = equipoFutbol.nombres;
        equip.liga = equipoFutbol.liga;
        const fecha = new Date(equipoFutbol.fechaCreacion);
        equip.fechaCreacion = fecha;
        equip.numeroCopasInternacionales = equipoFutbol.numeroCopasInternacionales;
        equip.campeonActual = equipoFutbol.campeonActual;
        equip.usuarioFK = equipoFutbol.usuarioFKIdUsuario;
        equip.img_equipo_futbol = equipoFutbol.img_equipo;

        this.equipoFutbolRepository.save(equip);
    }

    crearTodosEquiposFutbol(){

        for (var indice in Equipo_FutbolData){
            const equipoFutbol = new Equipo_futbolEntity();

            equipoFutbol.nombres = Equipo_FutbolData[indice].nombres;
            equipoFutbol.liga = Equipo_FutbolData[indice].liga;
            equipoFutbol.fechaCreacion = new Date(Equipo_FutbolData[indice].fechaCreacion);
            equipoFutbol.numeroCopasInternacionales = Equipo_FutbolData[indice].numeroCopasInternacionales;
            equipoFutbol.campeonActual = Equipo_FutbolData[indice].actualCampeon;
            equipoFutbol.usuarioFK = parseInt(Equipo_FutbolData[indice].usuarioFKIdUsuario);
            equipoFutbol.img_equipo_futbol = Equipo_FutbolData[indice].img_equipo_futbol;

            this.equipoFutbolRepository.save(equipoFutbol);
        }
    }


    //Metodo equiposFutbol por usuario
    async obtenerEquiposFutbolPorUsuario(idUser:number): Promise<Equipo_futbolEntity[]>{
        return (await this.equipoFutbolRepository.find({usuarioFK:Equal(idUser)}));
    }

    async buscarEquipoFutbolLike(name: string): Promise<Equipo_futbolEntity[]> {
        console.log(await this.equipoFutbolRepository.find({nombres:Like('%'+name+'%')}));
        return (await this.equipoFutbolRepository.find({nombres:Like('%'+name+'%')}));
    }
}


export class EquipoFutbol{
    constructor(
        public nombres:string,
        public liga:string,
        public fechaCreacion:string,
        public numeroCopasInternacionales:number,
        public campeonActual:boolean,
        public img_equipo:string,
        public usuarioFKIdUsuario:number,
    ){};
}