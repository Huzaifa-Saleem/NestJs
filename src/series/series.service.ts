import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from './series.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private readonly SeriesModel: Model<Series>,
  ) {}
  async create(createSeriesDto: CreateSeriesDto) {
    const data = await new this.SeriesModel(createSeriesDto);
    const saved = await data.save();
    return { message: 'Series is created! ', saved };
  }

  async findAll() {
    const showdata = await this.SeriesModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.SeriesModel.findById(id);
    return { mesage: 'ID Details', find_by_id };
  }

  async update(id: string, updateSeriesDto: UpdateSeriesDto) {
    const updating = await this.SeriesModel.findByIdAndUpdate(
      id,
      updateSeriesDto,
    );
    return { message: 'Series Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.SeriesModel.findByIdAndDelete(id);
    return { message: 'series is Deleted' };
  }
}
