import { PickType } from '@nestjs/mapped-types';
import { Series } from '../series.schema';

export class CreateSeriesDto extends PickType(Series, [
  'genre_id',
  'name',
  'description',
  'trailor',
]) {}
