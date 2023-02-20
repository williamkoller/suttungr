import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'william@mail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'YourPassword',
  })
  password: string;
}
