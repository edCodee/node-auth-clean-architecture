import { CustomError, UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, lastname, password, roles, img } = object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if(!name) throw CustomError.badRequest('Missing lastname');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!roles) throw CustomError.badRequest('Missing roles');

    return new UserEntity(
      _id || id,
      name,
      email,
      lastname,
      roles,
      img
    );
  }
}