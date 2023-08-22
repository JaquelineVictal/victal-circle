import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  IsDateString,
  IsISO8601,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  @IsISO8601()
  birth: string;

  @IsString()
  @IsNotEmpty()
  biography: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  createdAt: Date;
}
