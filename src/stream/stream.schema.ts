import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';

export type StreamDocument = HydratedDocument<Stream>;

@Schema()
export class Stream {
  id?: string;

  @IsString()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode',
  })
  Episode_id: string;

  @IsString()
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  User_id: string;

  @IsString()
  @Prop({ required: true })
  time: string;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);
