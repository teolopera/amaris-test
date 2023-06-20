export interface User {
  name: string | null;
  email: string | null;
  age: number | null;
  phone: number | null;
  password?: string | null;
  favoriteIngredients: string[];
  favoriteNationality: string[];
}

export interface RegisterUser extends User {
  repeatPassword: string | null;
}

export interface Restaurant {
  _id: string;
  name: string;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Food {
  _id: string;
  name: string;
  ingredients: string[];
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface Input {
  name: string;
  type?: string;
  label: string;
  onChange: (e: any) => void;
}
