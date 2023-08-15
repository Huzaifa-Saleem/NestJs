import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

export type SeriesDocument = HydratedDocument<Series>;

@Schema()
export class Series {
  id?: string;

  @IsString()
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Genre' })
  genre_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsString()
  @Prop({ required: true })
  trailor: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
