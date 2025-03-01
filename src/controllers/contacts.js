import createHttpError from "http-errors";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact
} from "../services/contacts.js";


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
    
export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a cntact!`,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const patchContact = await updateContact(contactId, req.body);

    if (!patchContact) {
        next(createHttpError(404, 'Not found'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully update a contact!',
        data: patchContact,
    });
};

