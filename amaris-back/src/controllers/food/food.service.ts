import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OptionsDto } from './dto/options.dto';
import { Food, FoodDocument } from '../../schemas/food.schema';

@Injectable()
export class FoodService {
  @InjectModel(Food.name) private model: Model<FoodDocument>;

  findAll() {
    return this.model.find();
  }

  getFavoriteFoodBasedOnIngredients(ingredients) {
    return this.model
      .find()
      .then((food) => {
        const favoriteFood = food.filter((foodItem) => {
          return ingredients.ingredients.some((ingredient) =>
            foodItem.ingredients.includes(ingredient),
          );
        });
        if (favoriteFood.length <= 0) {
          return [];
        }
        return favoriteFood;
      })
      .catch((error) => {
        return { code: 500, error };
      });
  }

  create(food: OptionsDto) {
    return this.model.create(food);
  }
}
