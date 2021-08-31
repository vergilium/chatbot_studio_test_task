import log from './utils/logger';
import appConf from './config';
import sequelize from './db/context/context';
import express, { Express } from 'express';
import cashierRouter from './routers/casher.router';

const app: Express = express();
app.use(express.json());
app.use('/api/cashier', cashierRouter);

app.use((_req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

sequelize.sync({force: true})
  .then(() => {
    log.info('DB connected!');
    app.listen(appConf.server.port, () => {
      log.info(`API server has started on port ${appConf.server.port}`);
    });
  })
  .catch(err => {
    log.error('Error connect to DB!\nMessage: ' + err.message);
  });

