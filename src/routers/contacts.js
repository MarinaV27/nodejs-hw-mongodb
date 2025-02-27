import { Router } from "express";
import { getContactsController, getContactsByIdController } from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', getContactsController);
    
router.get('/contacts/:contactId', getContactsByIdController);

ctrlWrapper(getContactsByIdController);

export default router;