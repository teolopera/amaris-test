import { IsString } from 'class-validator';

export class RestaurantDto {
  @IsString()
  name: string;
  @IsString()
  nationality: string;
}
