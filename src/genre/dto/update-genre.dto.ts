import { PickType } from '@nestjs/mapped-types';
import { Genre } from '../genre.schema';

export class UpdateGenreDto extends PickType(Genre, ['name']) {}
