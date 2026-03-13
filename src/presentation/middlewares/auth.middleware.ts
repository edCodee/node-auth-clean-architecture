import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../infrastructure/database/mongo/models/user.model";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // 1. Obtener el token de las cabeceras (headers)
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      // 2. Validar que el token sea nuestro y no haya expirado
      const payload = await jwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      // 3. Verificar que el usuario del token aún existe en la base de datos
      const user = await UserModel.findById(payload.id);
      if (!user)
        return res
          .status(401)
          .json({ error: "Invalid token - user not found" });

      // Si todo está bien, adjuntamos el usuario a la petición y dejamos pasar
      // Si el body no existe (ej. en peticiones GET), lo inicializamos como un objeto vacío
      req.body = req.body || {};

      // Adjuntamos el usuario a la petición y dejamos pasar
      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
