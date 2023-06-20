import { StatusResponse } from '../interfaces/Options';

export const RESPONSE: StatusResponse = {
  NOT_FOUND: {
    code: 401,
    message: 'User not found.',
  },
  USER_EXISTS: {
    code: 409,
    message: 'User already exists.',
  },
  INCORRECT_PASS_USER: {
    code: 403,
    message: 'User or password incorrect.',
  },
};
