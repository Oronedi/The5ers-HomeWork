import { FC } from 'react';
import { Row, Col, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

import userStore from '../../stores/userStore';
import StockBag from '../../components/StockBag/StockBag';
import StockSearch from '../../components/StockSearch/StockSearch';

const UserStocks: FC = () => (
  <div>
    <Typography.Title>התיק שלך, {userStore.user}</Typography.Title>
    <Row gutter={16}>
      <Col span={12}>
        <StockBag />
      </Col>
      <Col span={12}>
        <StockSearch />
      </Col>
    </Row>
  </div>
);

export default observer(UserStocks);
