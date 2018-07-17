import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Equipo_futbolEntity} from "../equipo_futbol/equipo_futbolEntity";

@Entity('jugador')
export class JugadorEntity {

    @PrimaryGeneratedColumn()
    id_jugador: number;
    @Column()
    numeroCamiseta: number;
    @Column()
    nombreCamiseta: string;
    @Column()
    nombreCompletoJugador: string;
    @Column()
    poderEspecialDos: string;
    @Column()
    fechaIngresoEquipo: Date;
    @Column()
    goles: number;
    @Column()
    img_jug: string;


    @ManyToOne(
        type => Equipo_futbolEntity,
        equipoFutbol => equipoFutbol.jugadores)
    id_equipo_futbol: Equipo_futbolEntity;

}
