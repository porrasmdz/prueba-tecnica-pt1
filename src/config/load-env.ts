import dotenv from 'dotenv';

dotenv.config();

export const config = {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
};