import { Controller, Post, Body, Get } from '@nestjs/common';

import { FoodService } from './food.service';
import { OptionsDto } from './dto/options.dto';

@Controller('/food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Post('/getFavorites')
  getFavoriteFood(@Body() ingredients) {
    return this.foodService.getFavoriteFoodBasedOnIngredients(ingredients);
  }

  @Post()
  createFood(@Body() food: OptionsDto) {
    return this.foodService.create(food);
  }
}
