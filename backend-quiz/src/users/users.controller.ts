import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() body: { name: string }) {
    return this.userService.createUser(body.name);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
