import { FC } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Form, Input, Button, Tabs, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import userStore from '../../stores/userStore';
import { API_URL } from '../../environment';

interface ErrorResponse {
  message?: string;
}

interface TabItems {
  key: string;
  label: string;
  children: JSX.Element;
}

const Auth: FC = () => {
  const [form] = Form.useForm();
  const navigate: NavigateFunction = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (values) => axios.post(`${API_URL}/api/auth/signup`, values),
    onSuccess: () => {
      message.success('המשתמש נוצר בהצלחה!');
      form.resetFields();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      message.error(
        error.response?.data?.message || 'אירעה שגיאה, נסה שוב מאוחר יותר'
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values) =>
      axios.post(`${API_URL}/api/auth/login`, values, {
        withCredentials: true,
      }),
    onSuccess: (res: AxiosResponse) => {
      message.success('התחברת בהצלחה!');
      userStore.login(res.data?.access_token);
      navigate('/home');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      message.error(
        error.response?.data?.message || 'אירעה שגיאה, נסה שוב מאוחר יותר'
      );
    },
  });

  const items: TabItems[] = [
    {
      key: 'sign up',
      label: 'להרשמה',
      children: (
        <Form
          form={form}
          name="signup"
          dir="rtl"
          onFinish={(values) => signupMutation.mutate(values)}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'אנא הכנס שם משתמש' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="שם משתמש" />
          </Form.Item>
          <Form.Item
            name="mail"
            rules={[{ required: true, message: 'אנא הכנס כתובת מייל' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="כתובת מייל"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'אנא הכנס סיסמה' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="סיסמה"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              לחץ להרשמה
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'login',
      label: 'התחברות',
      children: (
        <Form
          name="login"
          dir="rtl"
          onFinish={(values) => loginMutation.mutate(values)}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'אנא הכנס שם משתמש' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="שם משתמש" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'אנא הכנס סיסמה' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="סיסמה"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              לחץ להתחברות
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <>
      <Typography.Title
        underline={true}
        style={{
          fontFamily: 'Arial',
          textAlign: 'center',
          fontSize: '3.2vw',
        }}
      >
        The5ers - תרגיל בית
      </Typography.Title>
      <div
        style={{
          maxWidth: '30vw',
          margin: 'auto',
          padding: '50px',
        }}
      >
        <Tabs defaultActiveKey="login" items={items} centered />
      </div>
    </>
  );
};

export default observer(Auth);
