import { User } from './User';

export interface Food {
  id: number;
  name: string;
  ingredients: string[];
  nationality: string;
}

export interface Restaurant {
  id: number;
  name: string;
  nationality: string;
}

interface Response {
  code: number;
  message?: string;
  user?: User;
}

export interface StatusResponse {
  NOT_FOUND: Response;
  USER_EXISTS: Response;
  INCORRECT_PASS_USER: Response;
}
