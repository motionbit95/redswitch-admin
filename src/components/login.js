import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Row, Col, Modal, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
const LoginForm = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [modalOpen, setModalOpen] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Login</Button>
      <Modal
        title="Login"
        width={440}
        open={modalOpen}
        centered
        maskClosable={false}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <Form
          form={form}
          name="login"
          style={{
            minWidth: 300,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user_id"
            rules={[
              {
                required: true,
                message: "Please input your User ID!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="ID" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={8} justify={"center"}>
              <Col span={12}>
                <Button block type="primary" htmlType="submit">
                  Login
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default LoginForm;
