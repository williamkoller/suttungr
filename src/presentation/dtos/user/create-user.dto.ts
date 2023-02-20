import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'William',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Koller',
  })
  surname: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: true,
  })
  active: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'william@mail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 14)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    required: true,
    example: 'PasswordStrong',
  })
  password: string;
}
