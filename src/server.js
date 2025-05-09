import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));



export const setupServer = () => {
    const app = express();


    app.use(express.json());
    app.use(cors());

    app.use(cookieParser());
    
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello, Владислав Апельганц!',
        });
    });

    
    app.use(router);// Додаємо роутер до app як middleware

    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());


    app.use('*', notFoundHandler);

    app.use(errorHandler);
   
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
   
};
