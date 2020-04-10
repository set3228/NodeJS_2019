import Joi from 'joi';

const schemaLogin = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string()
        .alphanum()
        .required()
});

const validateLogin = (loginData) => {
    const { error } = Joi.validate(loginData, schemaLogin);
    return !!error;
};

export default {
    validateLogin
};
