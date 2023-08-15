import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Season } from './season.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name) private readonly SeasonModel: Model<Season>,
  ) {}
  async create(createSeasonDto: CreateSeasonDto) {
    const data = await new this.SeasonModel(createSeasonDto);
    const saved = await data.save();
    return { message: 'Season is created! ', saved };
  }

  async findAll() {
    const showdata = await this.SeasonModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.SeasonModel.findById(id);
    return { mesage: 'ID Details', find_by_id };
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto) {
    const updating = await this.SeasonModel.findByIdAndUpdate(
      id,
      updateSeasonDto,
    );
    return { message: 'Season Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.SeasonModel.findByIdAndDelete(id);
    return { message: 'Season is Deleted' };
  }
}
