import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StockService } from './stock.service';
import { StockDto } from './dto/stock.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decoreator';
import { Stock } from './schemas/stock.schema';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('my-stocks')
  getUserStocks(
    @User() user: JwtUser
  ): Promise<{ message: string; data: { stocks: Partial<Stock>[] } }> {
    return this.stockService.getUserStocks(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('buy')
  buyStock(
    @User() user: JwtUser,
    @Body() stockDto: StockDto
  ): Promise<{ message: string }> {
    return this.stockService.buyStock(user.userId, stockDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('sell/:symbol')
  sellStock(
    @User() user: JwtUser,
    @Param('symbol') symbol: string
  ): Promise<{ message: string }> {
    return this.stockService.sellStock(user.userId, symbol);
  }
}
