import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Equipo_futbolEntity} from "../equipo_futbol/equipo_futbolEntity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;
    @Column()
    nombre_usuario: string;
    @Column()
    password_usuario: string;
    @Column()
    img_usuario: string;

    @OneToMany(
        type => Equipo_futbolEntity,
        usuarioEntity => usuarioEntity.usuarioFK)
    equiposfutbol: Equipo_futbolEntity[];


}