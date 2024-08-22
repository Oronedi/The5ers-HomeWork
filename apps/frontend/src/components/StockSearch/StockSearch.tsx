import { FC, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Card, Input, List } from 'antd';
import { debounce, DebouncedFunc } from 'lodash';

import userStocksStore from '../../stores/userStocksStore';

const handleSearch: DebouncedFunc<(query: string) => void> = debounce(
  (query: string) => {
    userStocksStore.searchStocks(query);
  },
  400
);

const StockSearch: FC = observer(() => {
  const [query, setQuery] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (query.length >= 3) {
      handleSearch(query);
    }
  }, [query]);

  const handleMoveToStockPage: (symbol: string) => void = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  const handleAddStock: ({ name, symbol }: Stock) => void = ({
    name,
    symbol,
  }: Stock) => {
    userStocksStore.addStock({ symbol, name });
  };

  return (
    <div>
      <Input.Search
        placeholder="חפש מניה"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length >= 3 && (
        <List
          style={{
            maxHeight: '77vh',
            overflowY: 'auto',
          }}
          grid={{ column: 1 }}
          dataSource={userStocksStore.searchResults}
          renderItem={(stock: any) => (
            <List.Item>
              <Card
                style={{ direction: 'ltr' }}
                title={stock.symbol}
                extra={
                  <Button
                    type="default"
                    onClick={() => handleMoveToStockPage(stock.symbol)}
                  >
                    עבור לדף המניה
                  </Button>
                }
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p>{stock.name}</p>
                  </div>
                  <Button type="primary" onClick={() => handleAddStock(stock)}>
                    קנה מניה
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: 'לא נמצאו מניות' }}
        />
      )}
    </div>
  );
});

export default StockSearch;
