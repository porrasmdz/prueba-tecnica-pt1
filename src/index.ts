import "reflect-metadata"
import './config/load-env';
import init from './server';
import logger from './logger/logger';

const port = Number(process.env.PORT || 3000);
init().then((app) => app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`);
}));
