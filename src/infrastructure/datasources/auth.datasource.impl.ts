import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../database/mongo/models/user.model";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { UserMapper } from "../mappers/user.mapper";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, lastname, gender } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear instancia con hash de contraseña
      const user = new UserModel({
        name,
        email,
        password: bcryptAdapter.hash(password),
        lastname,
        gender,
      });

      // 3. Guardar en Base de Datos
      await user.save();

      // 4. Mapear la respuesta a nuestra Entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  //Nuevo metodo para el login
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      //Buscamos si el user existe
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest("Usuario no existe");

      //2 comparamos passwords
      const isMatching = bcryptAdapter.compare(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Password is not valid");

      //3 Mapear la entidad pura
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
