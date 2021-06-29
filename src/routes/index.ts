import * as winston from 'winston';

import userRouter from './user.routes';


import { UsersController } from '../controllers';
import { wrapHandlerWithJSONResponse } from '@commons/response';
// import { uploadMiddleware } from '@middleware/uploadMiddleware';
const users = new UsersController();

export function initRoutes(app, router) {
  winston.log('info', '--> Initialisations des routes');

  router
    .get('/', (req, res) => res.status(200).send({ message: 'Api asserting Server is runnig!' }))
    .put('/login', wrapHandlerWithJSONResponse(users.login))
    .post(
      '/image',
      // uploadMiddleware(),
      wrapHandlerWithJSONResponse(async (req, res) => req.file),
    );

  router.use('/users', userRouter);

  return router;
}
