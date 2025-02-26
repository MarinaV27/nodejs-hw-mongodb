import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';


const PORT = Number(getEnvVar('PORT', '3000'));



export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });


    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        // Відповідь, якщо контакт не знайдено
        if (!contact) {
            res.status(404).json({
                message: 'Student not found'
            });
            return;
        }

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            data: contact,
        });
    });

   

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
