import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/[0-9]{10,11}/),
    cpf: Joi.string().pattern(/[0-9]{11}/),
    birthday: Joi.date()
});

export default schema;