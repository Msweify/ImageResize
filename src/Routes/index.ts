import express from 'express';
import imgRoute from './api/imageRoute';

const routes = express.Router();

routes.use('/images', imgRoute);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('<h1>API page: To resize image navigate to /api/images</h1>');
});

export default routes;
