import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';

import { API_URL, FINANCE_API, FINANCE_API_KEY } from '../environment';
import UserStore from './userStore';

class UserStocksStore {
  userStocks: Stock[] = [];
  searchResults: Stock[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadUserStocks() {
    try {
      const response: AxiosResponse = await axios.get(
        `${API_URL}/api/stocks/my-stocks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      runInAction(() => {
        this.userStocks = response.data?.data?.stocks;
      });
    } catch (error) {
      console.error('Error loading user stocks:', error);
      UserStore.logout();
    }
  }

  async addStock(stock: Stock) {
    const exists: boolean = this.userStocks.some(
      (existingStock) => existingStock.symbol === stock.symbol
    );
    if (!exists) {
      try {
        const response: AxiosResponse = await axios.post(
          `${API_URL}/api/stocks/buy`,
          stock,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );

        if (response.status === 200) {
          runInAction(() => {
            this.userStocks = [...this.userStocks, stock];
          });
        }
      } catch (error) {
        console.error('Error adding stock:', error);
        UserStore.logout();
      }
    }
  }

  async removeStock(stockSymbol: string) {
    try {
      const response: AxiosResponse = await axios.delete(
        `${API_URL}/api/stocks/sell/${stockSymbol}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        runInAction(() => {
          this.userStocks = this.userStocks.filter(
            (stock) => stock.symbol !== stockSymbol
          );
        });
      }
    } catch (error) {
      console.error('Error removing stock:', error);
      UserStore.logout();
    }
  }

  async searchStocks(query: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${FINANCE_API}/search?query=${query}&exchange=NASDAQ&apikey=${FINANCE_API_KEY}`
      );
      runInAction(() => {
        this.searchResults = response.data;
      });
    } catch (error) {
      console.error('Error searching stocks:', error);
    }
  }
}

const userStocksStore: UserStocksStore = new UserStocksStore();
export default userStocksStore;
