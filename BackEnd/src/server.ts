import express from 'express';
import {
  configureMiddlewares,
  errorHandlerMiddleware,
} from './presentation/middleware';
import config from './infrastructure/config';
import { database } from './infrastructure';

import {
  userRouter,
  authRouter,
  processRouter,
  statsRouter,
} from './presentation/routes';
import productRouter from './presentation/routes/product.router';

const app = express();

configureMiddlewares(app);


app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(`${config.api.conventionApi}/auth`, authRouter);
app.use(`${config.api.conventionApi}/process`, processRouter);
app.use(`${config.api.conventionApi}/product`, productRouter);
app.use(`${config.api.conventionApi}/stats`, statsRouter);


app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.use(errorHandlerMiddleware);


const startServer = async () => {

  try {
    await database.connect(); 
    app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

startServer();
