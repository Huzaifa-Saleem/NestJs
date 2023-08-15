import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stream } from 'stream';
import { Model } from 'mongoose';

@Injectable()
export class StreamService {
  constructor(
    @InjectModel(Stream.name) private readonly StreamModel: Model<Stream>,
  ) {}
  async create(createStreamDto: CreateStreamDto) {
    const data = await new this.StreamModel(createStreamDto);
    const saved = await data.save();
    return { message: 'Stream is created! ', saved };
  }

  async findAll() {
    const showdata = await this.StreamModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.StreamModel.findById(id);
    return { mesage: 'ID Details', find_by_id };
  }

  async update(id: string, updateStreamDto: UpdateStreamDto) {
    const updating = await this.StreamModel.findByIdAndUpdate(
      id,
      updateStreamDto,
    );
    return { message: 'Stream Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.StreamModel.findByIdAndDelete(id);
    return { message: 'Stream is Deleted' };
  }
}
