import createHttpError from "http-errors";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortBy, sortOrder } = parseSortParams(req.query);
    
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user.id,
    });
    
        res.status(200).json({
        status: 200,
        message: "Successfully created a contact!",
        data: contacts,
    });
    
};


    export const getContactsByIdController = async (req, res) => {
        const { id } = req.params;
        const contact = await getContactById(id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        };

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${id}`,
            data: contact,
        });

};
    
export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { id } = req.params;
    const patchContact = await updateContact(id, req.body);

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

export const deleteContactController = async (req, res, next) => {
    const { id } = req.params;

    const contact = await deleteContact(id);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).json();


};