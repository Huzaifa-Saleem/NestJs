import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.schema';

export class UpdateUserDto extends PickType(User, [
  'first_name',
  'last_name',
  'email',
  'password',
]) {}
