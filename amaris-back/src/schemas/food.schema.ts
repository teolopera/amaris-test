import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Prop()
  name: string;
  @Prop()
  ingredients: string[];
  @Prop()
  nationality: string;
}
export const FoodSchema = SchemaFactory.createForClass(Food);
