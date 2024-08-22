import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockSchema } from './schemas/stock.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema }]),
    AuthModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [MongooseModule],
})
export class StockModule {}
