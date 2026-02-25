import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
    require('module-alias/register');
}

export const config = {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
};