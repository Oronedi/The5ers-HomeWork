import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Stock extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  symbol: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
