import * as Joi from 'joi';
export const JUGADOR_SCHEMA = Joi
    .object()
    .keys({
        numeroCamiseta:Joi.number().precision(2).required(),
        nombreCamiseta: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        nombreCompletoJugador:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        poderEspecialDos:Joi.string().regex(/^[a-zA-Z,.' ' ]{4,50}$/).required(),
        fechaIngresoEquipo:Joi.date().required(),
        goles:Joi.number().integer().required(),
        equipoFutbolID:Joi.number().integer().required(),
        img_jug:Joi.string()
    });