import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserModule } from './controllers/user/user.module';
import { FoodModule } from './controllers/food/food.module';
import { RestaurantModule } from './controllers/restaurants/restaurant.module';

const mongoConn = MongooseModule.forRoot(
  'mongodb+srv://teoslopera:test1234@cluster0.nnosiqo.mongodb.net/?retryWrites=true&w=majority',
  { dbName: 'amaris' },
);

@Module({
  imports: [UserModule, FoodModule, RestaurantModule, mongoConn],
})
export class AppModule {}
