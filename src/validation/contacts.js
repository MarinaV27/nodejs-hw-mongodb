import Joi from "joi";

export const createContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.string().min(3).max(20).required().pattern(/[+0*9]{3,20}$/),
        email: Joi.string().min(3).max(20),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().min(3).max(20).required(),

    });

export const updateContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30),
        phoneNumber: Joi.string().min(3).max(20).pattern(/[+0*9]{3,20}$/),
        email: Joi.string().min(3).max(20),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().min(3).max(20),
    });



        