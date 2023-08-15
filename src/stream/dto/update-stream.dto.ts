import { PickType } from '@nestjs/mapped-types';
import { Stream } from '../stream.schema';

export class UpdateStreamDto extends PickType(Stream, [
  'Episode_id',
  'User_id',
  'time',
]) {}
