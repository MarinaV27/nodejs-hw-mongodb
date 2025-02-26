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
        email: {
            type: String,
            required: true | false,
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

 const ContactsCollection = model('contacts', contactsShema);
export default ContactsCollection;

