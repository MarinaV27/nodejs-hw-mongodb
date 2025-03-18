import bcrypt from 'bcrypt';

import { usersCollection } from "../db/models/user.js";

export const registerUser = async (payload) => {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await usersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};