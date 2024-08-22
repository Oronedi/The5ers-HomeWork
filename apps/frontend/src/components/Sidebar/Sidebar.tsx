import React, { FC } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  StockOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

import userStore from '../../stores/userStore';

interface NavItem {
  key: string;
  icon: React.FunctionComponentElement<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >;
  label: string;
  danger?: boolean;
}

const { Sider } = Layout;

const navItems: NavItem[] = [
  {
    key: '/user',
    icon: React.createElement(UserOutlined),
    label: 'התיק שלך',
  },
  {
    key: '/stocks',
    icon: React.createElement(StockOutlined),
    label: 'המניות הכי נמכרות',
  },
  {
    key: '/settings',
    icon: React.createElement(SettingOutlined),
    label: 'הגדרות',
  },
];

const logoutItem: NavItem = {
  key: 'logout',
  icon: React.createElement(LogoutOutlined),
  label: 'התנתק',
  danger: true,
};

export const Sidebar: FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const onMenuClick: ({ key }: { key: string }) => void = ({
    key,
  }: {
    key: string;
  }) => {
    key === 'logout' ? userStore.logout() : navigate(key);
  };

  return (
    <Sider style={{ display: 'flex', flexDirection: 'column' }}>
      <Menu
        onClick={onMenuClick}
        style={{ height: '90vh', flexGrow: 1 }}
        mode="inline"
        defaultSelectedKeys={[window.location.pathname]}
        items={navItems}
      />
      <Menu
        onClick={onMenuClick}
        style={{ height: '10vh' }}
        mode="inline"
        items={[logoutItem]}
      />
    </Sider>
  );
};
