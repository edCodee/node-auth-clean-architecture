export class UserEntity {
  constructor(
    public UserId: string,
    public UserName: string,
    public UserEmail: string,
    public UserLastName: string,
    public UserGender:string,
    public UserRole: string[],
    public UserImg?: string,
  ) {}
}
