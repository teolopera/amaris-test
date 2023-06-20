import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop()
  name: string;
  @Prop()
  nationality: string;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
