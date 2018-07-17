import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {JugadorEntity} from "../jugadores/jugadorEntity";

@Entity('Equipo_Futbol')
export class Equipo_futbolEntity {

    @PrimaryGeneratedColumn()
    id_equipo_futbol: number;
    @Column()
    nombres: string;
    @Column()
    liga: string;
    @Column()
    fechaCreacion: Date;
    @Column()
    numeroCopasInternacionales: number;
    @Column()
    campeonActual: boolean;
    @Column()
    img_equipo_futbol: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.equiposfutbol)
    usuarioFK: UsuarioEntity;

    @OneToMany(
        type => JugadorEntity,
        jugadores => jugadores.id_equipo_futbol)
    jugadores: JugadorEntity[];

}