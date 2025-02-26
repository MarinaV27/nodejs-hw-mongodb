import { model, Schema } from "mongoose";

const contactsShema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enam: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
    },
);

export const ContactsCollection = model('contacts', contactsShema);


