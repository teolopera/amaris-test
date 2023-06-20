import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  age: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  favoriteIngredients: string[];
  @Prop()
  favoriteNationality: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
