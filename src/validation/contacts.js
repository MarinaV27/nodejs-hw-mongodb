import Joi from "joi";


export const createContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30),
        phoneNumber: Joi.string().min(8).max(20),
        email: Joi.string().email(),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().valid('work', 'home', 'personal'),
    });

export const updateContactSchema = createContactSchema.fork(
  ['name', 'phoneNumber', 'contactType'],
  (field) => field.required(),
);



        