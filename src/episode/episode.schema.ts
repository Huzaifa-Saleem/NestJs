import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema()
export class Episode {
  id?: string;

  @IsString()
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Season' })
  Season_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsString()
  @Prop({ required: true })
  image: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
