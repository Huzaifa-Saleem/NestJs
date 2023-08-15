import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './genre.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private readonly GenreModel: Model<Genre>,
  ) {}
  async aggregate(id: string) {
    try {
      const user = await this.GenreModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            let: { genre: '$_id' },
            from: 'series',
            pipeline: [
              { $match: { $expr: { $eq: ['$genre_id', '$$genre'] } } },
              {
                $lookup: {
                  let: { series: '$_id' },
                  from: 'seasons',
                  pipeline: [
                    { $match: { $expr: { $eq: ['$series_id', '$$series'] } } },
                    {
                      $lookup: {
                        let: { season: '$_id' },
                        from: 'episodes',
                        pipeline: [
                          {
                            $match: {
                              $expr: { $eq: ['$Season_id', '$$season'] },
                            },
                          },
                          {
                            $lookup: {
                              let: { episode: '$_id' },
                              from: 'streams',
                              pipeline: [
                                {
                                  $match: {
                                    $expr: {
                                      $eq: ['$Episode_id', '$$episode'],
                                    },
                                  },
                                },
                                {
                                  $lookup: {
                                    let: { stream: '$User_id' },
                                    from: 'users',
                                    pipeline: [
                                      {
                                        $match: {
                                          $expr: {
                                            $eq: ['$_id', '$$stream'],
                                          },
                                        },
                                      },
                                    ],
                                    as: 'user',
                                  },
                                },
                              ],
                              as: 'stream',
                            },
                          },
                        ],
                        as: 'episodes',
                      },
                    },
                  ],
                  as: 'season',
                },
              },
            ],
            as: 'series',
          },
        },
      ]);
      return { message: 'Succes', user };
    } catch (error) {
      return { message: 'error', data: error.message };
    }
  }
  async create(createGenreDto: CreateGenreDto) {
    const data = await new this.GenreModel(createGenreDto);
    const saved = await data.save();
    return { message: 'Genre is created! ', saved };
  }

  async findAll() {
    const showdata = await this.GenreModel.find();
    return { message: 'All Data is Available Here', showdata };
  }

  async findOne(id: string) {
    const find_by_id = await this.GenreModel.findById(id);
    return { mesage: 'ID Details', find_by_id };
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const updating = await this.GenreModel.findByIdAndUpdate(
      id,
      updateGenreDto,
    );
    return { message: 'Genre Updated!', updating };
  }

  async remove(id: string) {
    const del = await this.GenreModel.findByIdAndDelete(id);
    return { message: 'Genre is Deleted' };
  }
}
