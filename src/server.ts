
import express, { Express } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import corsOptions from "./config/cors"
import BaseRouter from './routes/index';
import PatientsRouter from './routes/patients';

import { errorHandlers } from './shared/errorHandler';
import { StatusCodes } from 'http-status-codes';

import AppDataSource from './database/datasource';

const app: Express = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('tiny', {
        skip: (req, res) => res.statusCode < 400,
    }));
}
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}
app.use(cors(corsOptions));

app.use('/', BaseRouter);
app.use('/pacientes', PatientsRouter);

app.use(...errorHandlers);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({});
});

const init = async (): Promise<Express> => {
    await AppDataSource.initialize()
    return app;
};

export default init;
