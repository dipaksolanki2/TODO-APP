const Joi = require('joi');

const todoValidator = {
    payload: Joi.object({
        text: Joi.string().required(),
        completed: Joi.boolean(),
    })
}

module.exports = {
  todoValidator,
}