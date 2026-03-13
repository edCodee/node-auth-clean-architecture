import { envs } from './config/envs';
import { MongoDatabase } from './infrastructure/database/mongo/mongo-database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  // 1. Conectar a la base de datos primero
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // 2. Iniciar el servidor con nuestras rutas globales
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  await server.start();
}