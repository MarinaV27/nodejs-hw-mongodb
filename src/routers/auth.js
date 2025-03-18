import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { reqisterUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';



const router = Router();

router.post(
    '/register',
    validateBody(reqisterUserSchema),
    ctrlWrapper(registerUserController),
);

export default router;