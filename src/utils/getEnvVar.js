import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name, defaultValue) => {
    const value = process.env[name];
    if (value) return value;
    if (defaultValue) return defaultValue;
    throw new Error(`Missing: process.env['${name}'].`);
};
console.log("SMTP_HOST:", process.env.SMTP_HOST);
