import express from 'express';
import routes from './Routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('<h1>Main page</h1>');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
