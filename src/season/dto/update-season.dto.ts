import { PickType } from '@nestjs/mapped-types';
import { Season } from '../season.schema';

export class UpdateSeasonDto extends PickType(Season, [
  'series_id',
  'name',
  'description',
]) {}
