import { model, Schema } from "mongoose";


const contactsSchema = new Schema(
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

        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        
    },
    {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);


