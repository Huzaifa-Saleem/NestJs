import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from './episode.schema';
import { Model } from 'mongoose';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode.name) private readonly EpisodeModel: Model<Episode>,
  ) {}
  async create(createEpisodeDto: CreateEpisodeDto) {
    const data = await new this.EpisodeModel(createEpisodeDto);
    const saved = await data.save();
    return { message: 'Episode is created! ', saved };
  }

  async findAll() {
    const showdata = await this.EpisodeModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.EpisodeModel.findById(id);
    return { mesage: 'ID Details', find_by_id };
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const updating = await this.EpisodeModel.findByIdAndUpdate(
      id,
      updateEpisodeDto,
    );
    return { message: 'Episode Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.EpisodeModel.findByIdAndDelete(id);
    return { message: 'Episode is Deleted' };
  }
}
