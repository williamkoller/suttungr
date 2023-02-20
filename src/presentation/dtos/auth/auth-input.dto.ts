import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
