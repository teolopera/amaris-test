import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto, LoginUser } from './dto/create-user.dto';
import { User as UserInterface } from '../../interfaces/User';
import { UserDocument, User } from '../../schemas/user.schema';
import { RESPONSE } from '../../utils/statusCodes';

@Injectable()
export class UserService {
  @InjectModel(User.name) private model: Model<UserDocument>;

  get() {
    return this.model.find();
  }

  getUser(param: { userId: string }) {
    return this.model
      .findById(param.userId)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        return { message: 'User not found.', error };
      });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;
    const user = await this.model.findOne({ email });

    if (user) {
      return RESPONSE.USER_EXISTS;
    }

    const createdUser = new this.model(createUserDto);
    await createdUser.save();
    return { user: this.sanitizeUser(createdUser), code: 201 };
  }

  async login(credentials: LoginUser): Promise<any> {
    const { email, password } = credentials;
    const user = await this.checkUserExistence(email);

    if (!user) {
      return RESPONSE.NOT_FOUND;
    }

    if (password !== user.password) {
      return RESPONSE.INCORRECT_PASS_USER;
    } else {
      return { user: this.sanitizeUser(user), code: 200 };
    }
  }

  sanitizeUser(user: UserInterface) {
    const sanitized = user.toObject();
    const { password, ...userData } = sanitized;
    return userData;
  }

  async checkUserExistence(email: string) {
    const user = await this.model.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
