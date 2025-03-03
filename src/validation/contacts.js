import Joi from "joi";

export const contactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.string().min(3).max(20).pattern(/[+0*9]{3,20}$/),
        email: Joi.string().required(),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().required(),

    });





        