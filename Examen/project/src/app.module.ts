import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Equipo_futbolController} from "./equipo_futbol/equipo_futbol.controller";
import {JugadorController} from "./jugadores/jugadorController";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {Equipo_FutbolService} from "./equipo_futbol/equipo_futbol_service.component";
import {JugadorService} from "./jugadores/jugador-service.component";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Equipo_futbolEntity} from "./equipo_futbol/equipo_futbolEntity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {JugadorEntity} from "./jugadores/jugadorEntity";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioController} from "./usuario/usuario.controller";

@Module({
  imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'examenweb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true
      }),
      TypeOrmModule.forFeature([
          Equipo_futbolEntity,
          UsuarioEntity,
          JugadorEntity,
      ]),
  ],
  controllers: [AppController, Equipo_futbolController, JugadorController, AutorizacionController, UsuarioController],
  providers: [AppService, Equipo_FutbolService, JugadorService, UsuarioService],
})
export class AppModule {}
