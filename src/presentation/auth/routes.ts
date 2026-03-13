import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
static get routes(): Router {
const router = Router();

// 1. Instanciamos el datasource
const datasource = new AuthDatasourceImpl();

// 2. Instanciamos el repositorio pasándole el datasource
const authRepository = new AuthRepositoryImpl(datasource);

// 3. Instanciamos el controlador pasándole el repositorio
const controller = new AuthController(authRepository);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente (Devuelve JWT)
 *       400:
 *         description: Error de validación o usuario existente
 */
router.post("/register", controller.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso (Devuelve JWT)
 */
router.post("/login", controller.loginUser);

/**
 * @swagger
 * /api/auth/:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario devuelto exitosamente
 *       401:
 *         description: No autorizado (Token faltante o inválido)
 */
router.get("/", [AuthMiddleware.validateJWT], controller.getUser);

return router;

}
}

//ir a pi http://localhost:3000/api-docs para el funcionamiento 