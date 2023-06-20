import { Controller, Post, Body, Get } from '@nestjs/common';

import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './dto/restaurant.dto';

@Controller('/restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Post('/getFavorites')
  getFavoriteRestaurant(@Body() nationality) {
    return this.restaurantService.getFavoriteRestaurantBasedOnNationality(
      nationality,
    );
  }

  @Post()
  createFood(@Body() food: RestaurantDto) {
    return this.restaurantService.create(food);
  }
}
