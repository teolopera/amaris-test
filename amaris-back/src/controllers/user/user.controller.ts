import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, LoginUser } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.get();
  }

  @Get('/:userId')
  getUser(@Param() param: { userId: string }) {
    return this.userService.getUser(param);
  }

  @Post('/login')
  loginUser(@Body() credentials: LoginUser) {
    return this.userService.login(credentials);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
