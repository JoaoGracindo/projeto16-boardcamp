import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    stockTotal: Joi.number().integer().min(1),
    pricePerDay: Joi.number().integer().min(1)
});

export default schema;