import { IsString, IsArray, ArrayMinSize } from 'class-validator';

export class OptionsDto {
  @IsString()
  name: string;
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  ingredients: string[];
  @IsString()
  nationality: string;
}
