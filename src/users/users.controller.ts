import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post('create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
