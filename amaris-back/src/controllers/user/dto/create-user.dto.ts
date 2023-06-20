import {
  IsEmail,
  IsString,
  IsAlphanumeric,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  age: string;
  @IsString()
  phone: string;
  @IsAlphanumeric()
  password: string;
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  favoriteIngredients: string[];
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  favoriteNationality: string[];
}

export class LoginUser {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  password: string;
}
