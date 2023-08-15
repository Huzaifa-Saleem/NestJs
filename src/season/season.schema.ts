import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

export type SeasonDocument = HydratedDocument<Season>;

@Schema()
export class Season {
  id?: string;

  @IsString()
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Series' })
  series_id: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  description: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
