import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  age: string;
  phone: string;
  password?: string;
  favoriteIngredients: string[];
  favoriteNationality: string[];
}
