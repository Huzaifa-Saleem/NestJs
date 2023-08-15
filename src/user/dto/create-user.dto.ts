import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.schema';

export class CreateUserDto extends PickType(User, [
  'first_name',
  'last_name',
  'email',
  'password',
]) {}
