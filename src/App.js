import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import BDSM from "./pages/bdsm";
import SubMenu from "antd/es/menu/SubMenu";
import BDSMResult from "./pages/bdsm_result";

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* 상단 헤더 */}
      <Header style={{ position: "fixed", zIndex: 999, width: "100%" }}>
        <div
          style={{
            float: "left",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Redswitch
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ justifyContent: "flex-end" }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <SubMenu key="submenu" title="Services">
            <Menu.Item key="3">Service 1</Menu.Item>
            <Menu.Item key="4">Service 2</Menu.Item>
            <Menu.Item key="5">Service 3</Menu.Item>
          </SubMenu>
          <Menu.Item key="6">Contact</Menu.Item>
        </Menu>
      </Header>

      {/* 메인 콘텐츠 */}
      <Content
        style={{
          marginTop: 64, // 헤더의 높이와 동일하게 설정
          padding: "24px",
          background: colorBgContainer,
          minHeight: "calc(100vh - 128px)", // 전체 높이에서 헤더와 푸터 제외
        }}
      >
        {/* <BDSM /> */}
        <BDSMResult />
      </Content>

      {/* 하단 푸터 */}
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
