import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Loaded SMTP_PASSWORD:', process.env.SMTP_PASSWORD);


const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrap();