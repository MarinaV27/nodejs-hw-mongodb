import { getAllContacts, getContactById } from "../services/contacts.js";


export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        message: "Successfully created a contact!",
        data: contacts,
    });
};
    export const getContactsByIdController = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        // Відповідь, якщо контакт не знайдено
        //if (!contact) {
        //    res.status(404).json({
        //        status: 404,
        //        message: 'Contact not found',
        //    });
        //    return;
        //}
        if (!contact) {
            next(new Error('Contact not found'));
            return;
        };

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });

    };