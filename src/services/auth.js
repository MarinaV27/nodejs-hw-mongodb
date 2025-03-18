import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { usersCollection } from "../db/models/user.js";

export const registerUser = async (payload) => {
    const user = await usersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email is use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await usersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await usersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(payload.password,
        user.password); // Порівнюємо хеші паролів
    
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

};