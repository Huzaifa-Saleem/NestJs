import { PickType } from '@nestjs/mapped-types';
import { Episode } from '../episode.schema';

export class UpdateEpisodeDto extends PickType(Episode, [
  'Season_id',
  'name',
  'description',
  'image',
]) {}
