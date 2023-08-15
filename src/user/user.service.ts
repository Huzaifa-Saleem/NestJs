import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model, mongo } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const data = await new this.UserModel(createUserDto);
    data.password = await this.hashPassword(data.password);
    const saved = await data.save();
    return { message: 'User is created! ', saved };
  }
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async comparePassword(
    enteredPassword: string,
    storedHashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return isMatch;
  }

  async findAll() {
    const showdata = await this.UserModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.UserModel.findById(id);
    // if (find_by_id == null) {
    // throw new HttpException('ID is not available', HttpStatus.UNAUTHORIZED);
    // } else {
    return { mesage: 'ID Details', find_by_id };
    // }
  }

  async aggregate(id: string) {
    try {
      // const user = await this.UserModel.aggregate([
      //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
      //   $lookup : {
      //     let : {userid:""}
      //   }
      // ]);
    } catch (error) {}
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updating = await this.UserModel.findByIdAndUpdate(id, updateUserDto);
    updating.password = await this.hashPassword(updating.password);
    return { message: 'User Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.UserModel.findByIdAndDelete(id);
    return { message: 'User is Deleted' };
  }
}
