import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../auth/schemas/user.schema';
import { Stock } from './schemas/stock.schema';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getUserStocks(
    userId: string
  ): Promise<{ message: string; data: { stocks: Partial<Stock>[] } }> {
    try {
      const user: User = await this.userModel
        .findById(userId)
        .populate({
          path: 'stocks',
          model: Stock.name,
        })
        .exec();

      if (!user) {
        throw new BadRequestException('User not found');
      }

      this.logger.log(`Retrieved stocks for user ${userId}`);

      const userStocks: Partial<Stock>[] = (
        user.stocks as unknown as Stock[]
      ).map(({ name, symbol }: Stock) => ({
        name,
        symbol,
      }));
      return {
        message: `Retirieved user ${user.username}'s stocks successfully`,
        data: {
          stocks: userStocks,
        },
      };
    } catch (error) {
      this.logger.error(
        `Failed to retrieve stocks for user ${userId}: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async buyStock(
    userId: string,
    stockDto: { name: string; symbol: string }
  ): Promise<{ message: string }> {
    try {
      const stock: Stock = await this.stockModel.findOneAndUpdate(
        { symbol: stockDto.symbol },
        { $setOnInsert: stockDto },
        { new: true, upsert: true }
      );

      const user: User = await this.userModel
        .findById(userId)
        .populate('stocks')
        .exec();
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const stockId: Types.ObjectId = stock._id as Types.ObjectId;
      if (!user.stocks.includes(stockId)) {
        user.stocks.push(stockId);
        await user.save();

        this.logger.log(`User ${userId} bought ${stock.name} successfully!`);
        return { message: 'User bought stock successfully!' };
      } else {
        this.logger.log(`User ${userId} already owns ${stock.name}`);
        return { message: 'User already owns this stock' };
      }
    } catch (error) {
      this.logger.error(`Failed to buy stock: ${error.message}`, error.stack);
      throw error;
    }
  }

  async sellStock(
    userId: string,
    stockSymbol: string
  ): Promise<{ message: string }> {
    try {
      const stock: Stock = await this.stockModel
        .findOne({ symbol: stockSymbol })
        .exec();
      if (!stock) {
        throw new BadRequestException('Stock not found');
      }

      const user: User = await this.userModel
        .findById(userId)
        .populate('stocks')
        .exec();
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const stockId: Types.ObjectId = stock._id as Types.ObjectId;

      if (user.stocks.includes(stockId)) {
        user.stocks = user.stocks.filter((id) => !id.equals(stockId));
        await user.save();

        this.logger.log(`User ${userId} sold ${stock.name} successfully!`);
        return { message: 'המשתמש מכר את המניה בהצלחה!' };
      } else {
        this.logger.log(`User ${userId} does not own ${stock.name}`);
        return { message: 'המשתמש לא החזיק במניה הזו' };
      }
    } catch (error) {
      this.logger.error(`Failed to sell stock: ${error.message}`, error.stack);
      throw error;
    }
  }
}
