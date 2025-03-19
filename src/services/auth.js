import crypto from "node:crypto";

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UsersCollection } from "../db/models/user.js";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';


export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email is use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user === null) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(payload.password,
        user.password); // Порівнюємо хеші паролів
    
    if (isEqual === false) {
        throw createHttpError(401, 'Unauthorized');
    }

    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken = crypto.randomBytes(30).toString('base64');

    return await SessionsCollection.create({
        iserId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
        refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

};
