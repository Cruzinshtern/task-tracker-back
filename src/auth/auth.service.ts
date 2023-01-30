import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
  }

  private async generateToken(user: LoginUserDto) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return { token: this.jwtService.sign(payload) }
  }
}
