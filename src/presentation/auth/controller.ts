import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
  LoginUser,
  LoginUserDto,
} from "../../domain";
import { jwtAdapter } from "../../config/jwt.adapter";

export class AuthController {
  //Inyectamos el repositorio (el contrato, no la implementacion directa)
  constructor(private readonly authRepository: AuthRepository) {}

  //Manejador centralizado de errores
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    //Si es un error que no controlamso (caida de la database , etc)
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  //Metodo par aregistrar
  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    //Instanciamos el caso de uso inyectando sus dependencias
    new RegisterUser(this.authRepository, jwtAdapter.generateToken)
      .execute(registerDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  //Metodo par ael login
  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository, jwtAdapter.generateToken)
      .execute(loginDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // Método para obtener el usuario actual (Ruta Protegida)
  getUser = (req: Request, res: Response) => {
    // Como pasó por el middleware, sabemos que req.body.user existe y es seguro
    const user = req.body.user;
    
    // Le quitamos el password antes de devolverlo por seguridad
    res.json({
      id: user._id,
      name: user.name,
      lastname:user.lastname,
      email: user.email,
      roles: user.roles,
      gender: user.gender,
    });
  };
}
