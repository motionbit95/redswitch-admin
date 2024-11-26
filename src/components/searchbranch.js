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

const SearchBranch = ({
  selectedBranch,
  setSelectedBranch,
  isSelectedBranch,
  setIsSelectedBranch,
  handleSearchBranch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranchs();
  }, []);

  const fetchBranchs = async () => {
    try {
      const response = await AxiosGet("/branches"); // Replace with your endpoint
      setBranches(response.data.map((item) => ({ key: item.id, ...item })));
    } catch (error) {
      message.error("거래처 데이터를 가져오는 데 실패함.");
    } finally {
      setLoading(false);
      console.log(branches);
    }
  };

  const handleOK = async (name) => {
    try {
      const branch = branches.find((item) => item.branches === name);
      if (!branch) {
        message.error("거래처가 잘못 선택되었습니다.");
        return;
      }
      setSelectedBranch(branch);
      setIsSelectedBranch(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in handleOK:", error.message);
      message.error(error.message || "선택 처리 중 오류가 발생했습니다.");
    }
  };

  const columns = [
    {
      title: "지점명",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "담당자",
      dataIndex: "branch_manager_name",
      key: "branch_manager_name",
    },
    {
      title: "담당자 전화번호",
      dataIndex: "branch_manager_phone",
      key: "branch_manager_phone",
    },
    {
      title: "동작",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="해당 지점을 선택하시겠습니까?"
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
        <Button onClick={() => setIsModalOpen(true)}>지점 선택</Button>
        {isSelectedBranch && (
          <>
            <div>{selectedBranch?.branch_name}</div>
            <Button type="primary" onClick={handleSearchBranch}>
              검색
            </Button>
          </>
        )}
      </Space>

      <Modal
        title="지점 검색"
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
          dataSource={branches}
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

export default SearchBranch;
