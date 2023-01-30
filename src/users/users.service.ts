import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5)
    const newUser = {...dto, id: uuidv4(), password: hashPassword};
    return await this.userRepository.create(newUser);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({where: {id}});
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({where: {email}});
  }
}
