import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Jugador, JugadorService} from "./jugador-service.component";
import {JugadorPipe} from "../pipes/jugador-pipe.service";
import {JUGADOR_SCHEMA} from "./jugador.schema";

@Controller('Jugador')
export class JugadorController {

    constructor(private  jugadorService: JugadorService){

    }

    //Body params
    @Post('registrar')
    crearJugador(@Body(new JugadorPipe(JUGADOR_SCHEMA)) bodyParams, @Res () response){
        const jugador1 = new  Jugador(
            bodyParams.numeroCamiseta,
            bodyParams.nombreCamiseta,
            bodyParams.nombreCompletoJugador,
            bodyParams.poderEspecialDos,
            bodyParams.fechaIngresoEquipo,
            bodyParams.goles,
            bodyParams.equipoFutbolID,
            bodyParams.img_jug,
        );

        this.jugadorService.crearJugador(jugador1);
        return response.send('Jugador Registrado');

    }

    @Get('crearJugadores')
    registrarAllJugadores(@Res () response, @Req () request){
        this.jugadorService.crearTodosJugadores()
        return response.status(202).send('Jugadores Creados');
    }

    @Get('mostrarJugadores')
    listarTodosLosJugadores(@Res () response, @Req () request){
        var promise = Promise.resolve(this.jugadorService.listarJugadores())

        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun jugador',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }


    @Get('/:name')
    mostrarJugadorLike(@Res () response, @Req () request, @Param() params){

        var promise = this.jugadorService.buscarJugLike(params.name);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el jugador',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }


    @Get('/:id')
    mostrarUnJugador(@Res () response, @Req () request, @Param() params){
        let arregloJugador = this.jugadorService.obtenerUno(params.id);
        if(arregloJugador){
            return response.send(arregloJugador);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Jugador no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarJugador(@Res () response, @Req () request, @Param() params, @Body(new JugadorPipe(JUGADOR_SCHEMA)) body){
        let arregloJugador = this.jugadorService.obtenerUno(params.id);
        if(arregloJugador){
            return response.send(
                this.jugadorService.editarUno(
                    params.id,
                    body.numeroCamiseta,
                    body.nombreCamiseta,
                    body.nombreCompletoJugador,
                    body.poderEspecialDos,
                    body.fechaIngresoEquipo,
                    body.goles,
                    body.id_equipo_futbol,
                ));
        } else{
            return response.send({
                mensaje:'Jugador no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
            });
        }
    }
}