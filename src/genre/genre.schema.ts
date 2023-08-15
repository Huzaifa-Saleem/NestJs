import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
  id?: string;

  @IsString()
  @Prop({ required: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
