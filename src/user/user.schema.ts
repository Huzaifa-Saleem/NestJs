import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsString } from 'class-validator';
// import { Role } from 'src/enum/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  id?: string;

  @IsString()
  @Prop({ required: true })
  first_name: string;

  @IsString()
  @Prop({ required: true })
  last_name: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @IsString()
  @Prop({ required: true })
  password: string;

  // @IsString()
  // @Prop({ required: true })
  // role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
