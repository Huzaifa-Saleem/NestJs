import { PickType } from '@nestjs/mapped-types';
import { Genre } from '../genre.schema';

export class CreateGenreDto extends PickType(Genre, ['name']) {}
