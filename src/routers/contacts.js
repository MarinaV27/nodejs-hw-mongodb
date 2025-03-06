import express from "express";
import {
    getContactsController,
    getContactsByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";


const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
    
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/contacts', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:id', isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:id',isValidId, ctrlWrapper(deleteContactController));

export default router;