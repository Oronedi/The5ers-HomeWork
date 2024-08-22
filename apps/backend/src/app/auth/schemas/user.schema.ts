import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ unique: [true, 'Duplicate username'] })
  username: string;

  @Prop({ unique: [true, 'Duplicate mail'] })
  mail: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Stock' }] })
  stocks: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
