import { FC } from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Future: FC = () => {
  const antIcon: JSX.Element = (
    <LoadingOutlined style={{ fontSize: 48 }} spin />
  );

  return (
    <Typography
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Text
        style={{
          marginTop: 20,
          margin: 100,
          fontSize: 24,
          color: '#595959',
        }}
      >
        אנחנו על זה, יגיע בגרסה הבאה, בלי נדר
      </Text>
      <Spin indicator={antIcon} />
    </Typography>
  );
};

export default Future;
