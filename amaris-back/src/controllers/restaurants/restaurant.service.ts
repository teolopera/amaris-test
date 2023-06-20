import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RestaurantDto } from './dto/restaurant.dto';
import {
  Restaurant,
  RestaurantDocument,
} from '../../schemas/restaurant.schema';

@Injectable()
export class RestaurantService {
  @InjectModel(Restaurant.name) private model: Model<RestaurantDocument>;

  findAll() {
    return this.model.find();
  }

  getFavoriteRestaurantBasedOnNationality(nationality) {
    return this.model
      .find()
      .then((restaurant) => {
        const favoriteRestaurants = restaurant.filter((restaurant) => {
          return nationality.nationality.includes(restaurant.nationality);
        });
        if (favoriteRestaurants.length <= 0) {
          return [];
        }
        return favoriteRestaurants;
      })
      .catch((error) => {
        return { code: 500, error };
      });
  }

  create(restaurant: RestaurantDto) {
    return this.model.create(restaurant);
  }
}
