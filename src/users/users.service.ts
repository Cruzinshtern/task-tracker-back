import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const newUser = {...dto, id: uuidv4()};
    return await this.userRepository.create(newUser);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({where: {id}});
  }
}
