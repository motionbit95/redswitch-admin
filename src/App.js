import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { DotChartOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import BDSMQuestions from "./pages/bdsm/bdsm_questions";
import BDSMResults from "./pages/bdsm/bdsm_results";
import Account from "./pages/admin/account";
import Provider from "./pages/admin/provider";
import Branch from "./pages/admin/branch";

const { Header, Content, Sider } = Layout;

// 각 페이지 컴포넌트
const BDSMAdvertise = () => <div>광고 관리 페이지</div>;
const BDSMTrend = () => <div>통계 관리 페이지</div>;

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

  // 메뉴 항목
  const items = [
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
      icon: React.createElement(UserOutlined),
      label: "관리자 설정",
      children: [
        {
          key: "/admin/account",
          label: <Link to="/admin/account">계정관리</Link>,
        },
        {
          key: "/admin/provider",
          label: <Link to="/admin/provider">거래처관리</Link>,
        },
        {
          key: "/admin/branch",
          label: <Link to="/admin/branch">지점관리</Link>,
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
          }}
        >
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
                <Route path="/admin/account" element={<Account />} />
                <Route path="/admin/provider" element={<Provider />} />
                <Route path="/admin/branch" element={<Branch />} />

                <Route path="/bdsm/questions" element={<BDSMQuestions />} />
                <Route path="/bdsm/results" element={<BDSMResults />} />
                <Route path="/bdsm/advertise" element={<BDSMAdvertise />} />
                <Route path="/bdsm/trend" element={<BDSMTrend />} />
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
