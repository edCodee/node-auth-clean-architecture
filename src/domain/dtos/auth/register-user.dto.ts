export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public lastname:string,
    public gender:string,
  ) {}

  // Usamos una tupla: [Error opcional, Instancia DTO opcional]
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, lastname, gender } = object;

    if (!name) return ['Missing name'];
    if(!lastname) return ['Missing lastname']
    if(!gender) return  ['Missing gender.']
    
    // Validación de email básica (se puede usar un RegExp más complejo)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) return ['Missing email'];
    if (!emailRegex.test(email)) return ['Email is not valid'];

    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password muy corta , minin 6 caracteres.'];

    return [undefined, new RegisterUserDto(name, email, password, lastname, gender)];
  }
}