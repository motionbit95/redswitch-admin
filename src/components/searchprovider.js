import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { AxiosGet } from "../api";

const Searchprovider = ({
  selectedProvider,
  setSelectedProvider,
  isSelectedProvider,
  setisSelectedProvider,
  handleSearch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
    console.log(providers);
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await AxiosGet("/providers"); // Replace with your endpoint
      setProviders(response.data.map((item) => ({ key: item.id, ...item })));
    } catch (error) {
      message.error("거래처 데이터를 가져오는 데 실패함.");
    } finally {
      setLoading(false);
      console.log(providers);
    }
  };

  const handleOK = async (name) => {
    try {
      const provider = providers.find((item) => item.provider_name === name);
      if (!provider) {
        message.error("거래처가 잘못 선택되었습니다.");
        return;
      }
      setSelectedProvider(provider);
      setisSelectedProvider(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in handleOK:", error.message);
      message.error(error.message || "선택 처리 중 오류가 발생했습니다.");
    }
  };

  const columns = [
    {
      title: "거래처명",
      dataIndex: "provider_name",
      key: "provider_name",
    },
    {
      title: "거래처코드",
      dataIndex: "provider_code",
      key: "provider_code",
    },
    {
      title: "담당자",
      dataIndex: "provider_manager_name",
      key: "provider_manager_name",
    },
    {
      title: "담당자 전화번호",
      dataIndex: "provider_manager_phone",
      key: "provider_manager_phone",
    },
    {
      title: "동작",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="거래처을 선택하시겠습니까?"
            onConfirm={() => handleOK(record.provider_name)}
          >
            <Button size="small" type="primary">
              선택
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space size="middle">
        <Button onClick={() => setIsModalOpen(true)}>거래처 선택</Button>
        {isSelectedProvider && (
          <>
            <div>{selectedProvider?.provider_name}</div>
            <Button type="primary" onClick={handleSearch}>
              검색
            </Button>
          </>
        )}
      </Space>

      <Modal
        title="거래처 검색"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            닫기
          </Button>,
        ]}
      >
        <SearchForm />
        <Table
          size="small"
          rowKey="id"
          columns={columns}
          dataSource={providers}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Modal>
    </>
  );
};
const SearchForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return <div>검색 폼</div>;
};

export default Searchprovider;
