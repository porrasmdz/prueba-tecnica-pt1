import express, { Express } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import corsOptions from "./config/cors"
import BaseRouter from './routes/index';

import { errorHandlers } from './shared/errorHandler';
import { StatusCodes } from 'http-status-codes';

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

app.use(...errorHandlers);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({});
});

const init = async (): Promise<Express> => {
    // await DBCONNECTION SERVICE
    return app;
};

// Export express instance
export default init;
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');

// const helmet = require('helmet')

// var app = express();

// app.use(helmet())
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {


//   // render the error page
//   res.status(err.status || 500).json({
//     success: false,
//     status: (err.status || 500),
//     message: err.message || 'Error interno del servidor',
//     error: req.app.get('env') === 'development' ? err : undefined
//   });
// });

// module.exports = app;
