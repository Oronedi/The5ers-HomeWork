import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Typography } from 'antd';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

import { FINANCE_API, FINANCE_API_KEY } from '../../environment';

interface FinanceStock {
  companyName: string;
  symbol: string;
  price: number;
  changes: number;
  image: string;
}

const { Title } = Typography;

const fetchStockDetails: (symbol: string) => Promise<FinanceStock> = async (
  symbol: string
) => {
  const response = await axios.get(
    `${FINANCE_API}/profile/${symbol}?apikey=${FINANCE_API_KEY}`
  );
  return response.data[0];
};

const Stock: FC = () => {
  const { symbol } = useParams<string>();

  const {
    data: stockDetails,
    error,
    isLoading,
  }: UseQueryResult<FinanceStock, Error> = useQuery({
    queryKey: ['stockDetails', symbol],
    queryFn: () => fetchStockDetails(`${symbol}`),
    retry: 1,
  });

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!stockDetails || error || !symbol) {
    return <div>אופס! לא נמצא מידע על מניה זאת</div>;
  }

  const changeColor: string = stockDetails.changes > 0 ? 'green' : 'red';
  const formattedChange: string = Math.abs(stockDetails.changes).toFixed(2);

  return (
    <Card
      title={stockDetails.companyName}
      style={{ margin: '20px', height: '50vh' }}
    >
      <Title level={4}>{stockDetails.symbol}</Title>
      <img
        src={stockDetails.image}
        alt={`${stockDetails.companyName} logo`}
        style={{
          width: '100px',
          height: 'auto',
          marginBottom: '20px',
          background: 'black',
        }}
      />
      <p>מחיר מניה: ${stockDetails.price}</p>
      <p>
        <span style={{ color: 'initial' }}>שינוי יומי: </span>
        <span style={{ color: changeColor }}>{formattedChange}</span>
      </p>
    </Card>
  );
};

export default Stock;
