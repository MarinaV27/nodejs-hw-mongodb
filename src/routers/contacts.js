import { Router } from "express";
import { getAllContacts, getContactById } from "../services/contacts.js";

const router = Router();

router.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully created a contact!",
            data: contacts,
        });
});
    
router.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        // Відповідь, якщо контакт не знайдено
        if (!contact) {
            res.status(404).json({
                status: 404,
                message: 'Contact not found',
            });
            return;
        }

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });
    });


export default router;