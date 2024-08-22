import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { DB_URI } from '../environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(DB_URI),
    AuthModule,
    StockModule,
  ],
})
export class AppModule {}
