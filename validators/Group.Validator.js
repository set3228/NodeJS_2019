import Joi from 'joi';

const schemaBody = Joi.object().keys({
    name: Joi.string()
        .alphanum()
        .required(),
    permissions: Joi.array()
        .items(
            Joi.string().valid(['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])
        )
        .required()
});

const schemaId = Joi.string().guid({ version: 'uuidv4' });

const validateBody = (req, res, next) => {
    const { body } = req;
    const { error } = Joi.validate(body, schemaBody);
    if (error) {
        // eslint-disable-next-line callback-return
        next(error);
    }
    next();
};

const validateId = (req, res, next) => {
    const { params: { id } } = req;
    const { error } = Joi.validate(id, schemaId);
    if (error) {
        // eslint-disable-next-line callback-return
        next(error);
    }
    next();
};

export default {
    validateBody,
    validateId
};
