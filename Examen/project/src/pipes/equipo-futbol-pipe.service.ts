import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class EquipoFutbolPipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarEquipoFutbol: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarEquipoFutbol, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Equipo de Futbol no valido',
                },
                10
            )
        }else{
            return jsonValidarEquipoFutbol;
        }

    }
}