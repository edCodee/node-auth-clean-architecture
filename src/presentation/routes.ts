//Este sera el enrutador global
import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { setupSwagger } from "./swagger";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //new encendemos swagger
    setupSwagger(router);

    // 1. Ruta de Salud (Health Check) recuperada
    router.get("/api/health", (req, res) => {
      res.status(200).json({ status: "ok", message: "API running smoothly" });
    });

    //Definimos la ruta vase para el module de autenticacion
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
