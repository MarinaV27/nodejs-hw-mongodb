import { Router } from "express";
import {
    getContactsController,
    getContactsByIdController,
    createContactController
} from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', getContactsController);
    
router.get('/contacts/:contactId', getContactsByIdController);

ctrlWrapper(getContactsByIdController);

router.post('/contacts', ctrlWrapper(createContactController));

export default router;