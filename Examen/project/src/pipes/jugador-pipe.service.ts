import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class JugadorPipe implements PipeTransform{
    constructor (private readonly _schema){
    }
    transform(jsonValidarJugador: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarJugador, this._schema)
        if(error){
            //botar un error
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Jugador no valido',
                },
                10
            )
        } else{
            return jsonValidarJugador;
        }
    }
}