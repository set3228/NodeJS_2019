import Joi from 'joi';

const schemaBody = Joi.object().keys({
    login: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

const schemaId = Joi.string().guid({ version: 'uuidv4' });

const schemaQuery = Joi.object().keys({
    limit: Joi.number()
        .integer()
        .min(1)
        .max(1000)
        .required(),
    loginSubstring: Joi.string()
        .alphanum()
        .required()
});

export const validateBody = (req, res, next) => {
    const { body } = req;
    const { error } = Joi.validate(body, schemaBody);
    if (error) {
        // eslint-disable-next-line callback-return
        next(error);
    }
    next();
};

export const validateId = (req, res, next) => {
    const { params: { id } } = req;
    const { error } = Joi.validate(id, schemaId);
    if (error) {
        // eslint-disable-next-line callback-return
        next(error);
    }
    next();
};

export const validateQuery = (req, res, next) => {
    const { query } = req;
    const { error } = Joi.validate(query, schemaQuery);
    if (error) {
        // eslint-disable-next-line callback-return
        next(error);
    }
    next();
};
