import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @IsString({message: 'Has to be a string'})
  readonly firstName: string;

  @IsString({message: 'Has to be a string'})
  readonly lastName: string;

  @IsString({message: 'Has to be a string'})
  @IsEmail({}, {message: "Email format is incorrect"})
  readonly email: string;

  @IsString({message: 'Должно быть строкой'})
  @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
  readonly password: string;
}
