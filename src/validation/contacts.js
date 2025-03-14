import Joi from "joi";

export const createContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name cannot exceed {#limit} characters',
    'any.required': 'Name is a required field',
  }),
        phoneNumber: Joi.string().required().pattern(/[+0*9]{3,20}$/),
        email: Joi.string(),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().valid('work', 'home', 'personal').required(),

    });

export const updateContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name cannot exceed {#limit} characters',
    'any.required': 'Name is a required field',
  }),
        phoneNumber: Joi.string().pattern(/[+0*9]{3,20}$/),
        email: Joi.string(),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().valid('work', 'home', 'personal').required(),
    });



        