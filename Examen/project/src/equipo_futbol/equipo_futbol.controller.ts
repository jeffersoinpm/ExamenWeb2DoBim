import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Equipo_FutbolService,EquipoFutbol} from "./equipo_futbol_service.component";
import {EquipoFutbolPipe} from "../pipes/equipo-futbol-pipe.service";
import {EQUIPO_FUTBOL_SCHEMA} from "./equipo_futbol.schema";


@Controller('Equipo_Futbol')
export  class Equipo_futbolController {

    constructor(private  equipo_futbolService: Equipo_FutbolService){

    }
    //Body params
    @Post('registrar') //uso pipe
    crearEquipoFutbol(@Body(new EquipoFutbolPipe(EQUIPO_FUTBOL_SCHEMA)) bodyParams, @Res () response) {
            const equipo_futbol1 = new EquipoFutbol(
                bodyParams.nombres,
                bodyParams.liga,
                bodyParams.fechaCreacion,
                bodyParams.numeroCopasInternacionales,
                bodyParams.campeonActual,
                bodyParams.usuarioFKIdUsuario,
                bodyParams.img,
            );
            this.equipo_futbolService.crearEquipoFutbol(equipo_futbol1);

            return response.send('Equipo de Fútbol Registrado');
    }

    @Get('crearEquiposFutbol')
    registrarAllEquiposFutbol(@Res () response, @Req () request){
        this.equipo_futbolService.crearTodosEquiposFutbol()
        return response.status(202).send('Equipos de Fútbol Creados');
    }

    @Get('mostrarEquiposFutbol')
    listarTodosLosEquiposFutbol(@Res () response, @Req () request){
        var promise = Promise.resolve(this.equipo_futbolService.listarEquiposFutbol());
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun equipo de fútbol',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }
    @Get('/:name')
    mostrarEquipoFutbolLike(@Res () response, @Req () request, @Param() params){

        var promise = this.equipo_futbolService.buscarEquipoFutbolLike(params.name);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el usuario',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }
    @Get('/:id')
    mostrarEquipoFutbol(@Res () response, @Req () request, @Param() params){

        var promise = this.equipo_futbolService.obtenerEquiposFutbolPorUsuario(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el equipo de fútbol',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }
}