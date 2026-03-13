import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";

//Definimos como queremos que sea la respuesta final.
interface UserToken {
  token: string;
  user: { id: string; name: string; email: string };
}

//Definimos la firma de la funcion que generara el token (inversion de dependencias)
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserCase {
  execute(dto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserCase {
  //Inyectamos el repository y la funcion creadora de tokens
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken,
  ) {}

  async execute(dto: RegisterUserDto): Promise<UserToken> {
    //Guardar el user en la database
    const user = await this.authRepository.register(dto);

    //Generamos el token (JWT)
    const token = await this.signToken({ id: user.UserId }, "2h");
    if (!token) throw CustomError.internalServer("Error al generar el token");

    //3 retornar la respuesta limpi (sin password, sin data extra de mongo )
    return {
      token: token,
      user: {
        id: user.UserId,
        name: user.UserName,
        email: user.UserEmail,
      },
    };
  }
}
