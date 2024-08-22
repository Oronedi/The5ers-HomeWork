import { FC, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { List, Button, Card } from 'antd';
import { WalletFilled } from '@ant-design/icons';

import userStocksStore from '../../stores/userStocksStore';

const EmptyBag: FC = () => (
  <div>
    <WalletFilled style={{ fontSize: '8vh', color: '#1890ff' }} />
    <p>התיק שלך ריק, הגיע הזמן למלא אותו במניות ולעשות מלא כסף!</p>
  </div>
);

const StockBag: FC = observer(() => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    userStocksStore.loadUserStocks();
  }, []);

  return (
    <Card
      title="המניות שלך"
      style={{ height: '80vh', textAlign: 'center', overflowY: 'auto' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={userStocksStore.userStocks}
        locale={{ emptyText: <EmptyBag /> }}
        renderItem={({ symbol, name }: { symbol: string; name: string }) => (
          <List.Item
            actions={[
              <Button onClick={() => navigate(`/stock/${symbol}`)}>
                עבור לדף המניה
              </Button>,
              <Button
                danger={true}
                onClick={() => userStocksStore.removeStock(symbol)}
              >
                מכור מניה
              </Button>,
            ]}
          >
            <List.Item.Meta title={symbol} description={name} />
          </List.Item>
        )}
      />
    </Card>
  );
});

export default StockBag;
