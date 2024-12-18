import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  DotChartOutlined,
  UserOutlined,
  ReadOutlined,
  DollarOutlined,
  InboxOutlined,
  TruckOutlined,
  ShopOutlined,
  TeamOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
import BDSMQuestions from "./pages/bdsm/bdsm_questions";
import BDSMResults from "./pages/bdsm/bdsm_results";
import Account from "./pages/admin/account";
import Provider from "./pages/provider/provider";
import Branch from "./pages/admin/branch";
import Main from "./pages/admin/main";
import Post from "./pages/post/post";
import FranchisePost from "./pages/provider/franchise_post";
import LoginForm from "./components/login";
import Product from "./pages/product/product";
import Inventory from "./pages/product/inventory";
import Purchase_order from "./pages/product/purchase_order";
import Order from "./pages/order/order";
import BDSMStatistics from "./pages/bdsm/bdsm_statistics";
import Material from "./pages/product/material";
import Salse from "./pages/sales/salse";
import Settlement from "./pages/sales/settlement";

const { Header, Content, Sider } = Layout;

// 각 페이지 컴포넌트
const BDSMAdvertise = () => <div>광고 관리 페이지</div>;
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const defaultOpenKeys = window.location.pathname.split("/")[1];
  const defaultSelectedKeys = window.location.pathname;

  useEffect(() => {
    console.log("App component mounted");
    console.log(window.location.pathname.split("/")[1]);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 메뉴 항목
  const items = [
    {
      key: "sales",
      icon: React.createElement(DollarOutlined),
      label: "매출관리",
      children: [
        {
          key: "/sales/sales",
          label: <Link to="/sales/sales">매출관리</Link>,
        },
        {
          key: "/sales/settlement",
          label: <Link to="/sales/settlement">정산관리</Link>,
        },
      ],
    },
    {
      key: "order",
      icon: React.createElement(TruckOutlined),
      label: "주문관리",
      children: [
        {
          key: "/order/order",
          label: <Link to="/order/order">주문관리</Link>,
        },
      ],
    },
    {
      key: "product",
      icon: React.createElement(InboxOutlined),
      label: "상품관리",
      children: [
        {
          key: "/product/material",
          label: <Link to="/product/material">상품등록</Link>,
        },
        {
          key: "/product/product",
          label: <Link to="/product/product">상품관리</Link>,
        },
        {
          key: "/product/inventory",
          label: <Link to="/product/inventory">재고관리</Link>,
        },
        {
          key: "/product/purchase_order",
          label: <Link to="/product/purchase_order">발주관리</Link>,
        },
      ],
    },
    {
      key: "post",
      icon: React.createElement(ReadOutlined),
      label: "게시판",
      children: [
        {
          key: "/post/post",
          label: <Link to="/post/post">게시판</Link>,
        },
      ],
    },
    {
      key: "provider",
      icon: React.createElement(TeamOutlined),
      label: "가맹점관리",
      children: [
        {
          key: "/provider/provider",
          label: <Link to="/provider/provider">가맹점관리</Link>,
        },
        {
          key: "/provider/post",
          label: <Link to="/provider/post">가맹점신청</Link>,
        },
      ],
    },
    {
      key: "branch",
      icon: React.createElement(ShopOutlined),
      label: "업장관리",
      children: [
        {
          key: "/branch/branch",
          label: <Link to="/branch/branch">업장관리</Link>,
        },
      ],
    },
    {
      key: "bdsm",
      icon: React.createElement(DotChartOutlined),
      label: "BDSM",
      children: [
        {
          key: "/bdsm/questions",
          label: <Link to="/bdsm/questions">문항관리</Link>,
        },
        {
          key: "/bdsm/results",
          label: <Link to="/bdsm/results">성향관리</Link>,
        },
        {
          key: "/bdsm/advertise",
          label: <Link to="/bdsm/advertise">광고관리</Link>,
        },
        {
          key: "/bdsm/trend",
          label: <Link to="/bdsm/trend">통계관리</Link>,
        },
      ],
    },
    {
      key: "admin",
      icon: React.createElement(SolutionOutlined),
      label: "관리자 설정",
      children: [
        {
          key: "/admin/account",
          label: <Link to="/admin/account">계정관리</Link>,
        },
        {
          key: "/admin/hompage",
          label: <Link to="/admin/hompage">홈페이지관리</Link>,
        },
      ],
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: "100vh", minWidth: "1200px" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              float: "left",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={() => {
              window.location.href = "/admin";
            }}
          >
            Redswitch
          </div>
          <Space>
            {isLoggedIn ? (
              <Space>
                <Button onClick={handleLogout}>Logout</Button>
              </Space>
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}
            {/* <Switch checked={isDarkMode} onChange={toggleTheme} /> */}
          </Space>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[defaultSelectedKeys]}
              defaultOpenKeys={[defaultOpenKeys]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {/* 페이지 라우팅 */}
              <Routes>
                <Route path="/admin" element={<Main />} />
                <Route path="/admin/account" element={<Account />} />

                <Route path="/branch/branch" element={<Branch />} />

                <Route path="/provider/provider" element={<Provider />} />
                <Route path="/provider/post" element={<FranchisePost />} />

                <Route path="/bdsm/questions" element={<BDSMQuestions />} />
                <Route path="/bdsm/results" element={<BDSMResults />} />
                <Route path="/bdsm/advertise" element={<BDSMAdvertise />} />
                <Route path="/bdsm/trend" element={<BDSMStatistics />} />

                <Route path="/product/material" element={<Material />} />
                <Route path="/product/product" element={<Product />} />
                <Route path="/product/inventory" element={<Inventory />} />
                <Route
                  path="/product/purchase_order"
                  element={<Purchase_order />}
                />

                <Route path="/order/order" element={<Order />} />

                <Route path="/post/post" element={<Post />} />

                <Route path="/sales/sales" element={<Salse />} />
                <Route path="/sales/settlement" element={<Settlement />} />
              </Routes>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Redswitch ©{new Date().getFullYear()} Created by Redswitch
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
