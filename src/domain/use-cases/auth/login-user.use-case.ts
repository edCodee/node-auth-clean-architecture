import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(dto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken,
  ) {}

  async execute(dto: LoginUserDto): Promise<UserToken> {
    //1validar credenciadl con el repositorio
    const user = await this.authRepository.login(dto);

    //2 Generar JWT
    const token = await this.signToken({ id: user.UserId }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    //3 Retornar respuesta
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
