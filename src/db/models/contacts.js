import { model, Schema } from "mongoose";
import { type } from "node:os";

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
            ref: 'users'
        },
        
    },
    {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);


