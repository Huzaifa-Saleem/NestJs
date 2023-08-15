import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async findAll() {
    return this.UserModel.find();
  }
  async registerUser(createUserDto: CreateUserDto) {
    const create = new this.UserModel(createUserDto);
    const user = await this.Useremail(create.email);

    if (user) {
      return 'User already Exist here!';
    }
    create.password = await this.UserService.hashPassword(create.password);
    return await create.save();
  }

  async Useremail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.Useremail(email);
    if (user == null) {
      throw new HttpException('Email is wrong ', HttpStatus.UNAUTHORIZED);
    }
    const PasswordMatch = this.UserService.comparePassword(pass, user.password);
    if (!PasswordMatch) {
      throw new HttpException('Password is wrong ', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, username: user.first_name };
    return {
      message: 'Token is Approved!',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
