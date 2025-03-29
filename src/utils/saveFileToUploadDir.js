import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar';


export const saveFileToUploadDir = async (file) => {
    await fs.rename(
        path.join(TEMP_UPLOAD_DIR, file.falename),
        path.join(UPLOAD_DIR, file.falename),
    );
    return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};