import createHttpError from "http-errors";
import { getAllContacts, getContactById } from "../services/contacts.js";


export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    
        res.status(200).json({
        status: 200,
        message: "Successfully created a contact!",
        data: contacts,
    });
    
};

    export const getContactsByIdController = async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        };

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });

    };