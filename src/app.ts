/********************************************
 * Endpoint file.
 * @author Maloivan Oleksii
 * @version 1.0.0
 * @description The app.ts is endpoint file
 * for start application.
 ********************************************/
//#region imports section
import log from './utils/logger';
import appConf from './config';
import sequelize from './db/context/context';
import express, { Express } from 'express';
import cashierRouter from './routers/casher.router';
import * as sequelize_fixtures from 'sequelize-fixtures';
//#region 

/**
 * Middleware declaration
 */
const app: Express = express();
app.use(express.json());
//Routes declaration
app.use('/api/cashier', cashierRouter);

/**
 * Default rout if not found other routes
 */
app.use((_req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

/**
 * Main function.
 * Connection to db, init db and start web server
 */
sequelize.sync({ force: true })
  .then(async () => {
    log.info('DB connected!');
    // Initialization db from saved fixtures
    const dbTransaction = await sequelize.transaction();
    await sequelize_fixtures.loadFile(__dirname + '/db/fixtures/*fixture.json', sequelize.models, {
      log: (msg: string) => log.debug(msg),
      transaction: dbTransaction
    });
    dbTransaction.commit();

    // Web servrer start
    app.listen(appConf.server.port, () => {
      log.info(`API server has started on port ${appConf.server.port}`);
    });
  })
  .catch(err => {
    log.error('Error connect to DB!\nMessage: ' + err.message);
    log.debug(err);
  });

