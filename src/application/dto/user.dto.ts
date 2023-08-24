import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'YYYY-MM-DD' })
  @IsDateString()
  @IsNotEmpty()
  @IsISO8601()
  birth: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  biography: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}
