import * as Joi from 'joi';
export const EQUIPO_FUTBOL_SCHEMA = Joi
    .object()
    .keys({
        nombres:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        liga: Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        fechaCreacion:Joi.date().required(),
        numeroCopasInternacionales:Joi.number().integer().min(0).max(8).required(),
        actualCampeon:Joi.boolean().required(),
        usuarioFKIdUsuario: Joi.number().integer().required(),
        img_equipo_futbol:Joi.string()
    });
