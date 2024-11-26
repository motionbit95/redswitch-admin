import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  message,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import Searchprovider from "../../components/searchprovider";
import Addproduct from "../../components/product/product_add";
import ProductCategory from "../../components/product/product_category";
import { AxiosDelete, AxiosGet } from "../../api";

const Material = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchFilters, setSearchFilters] = useState({
    provider: "",
  });
  const [materialList, setMaterialList] = useState([]);
  const [list, setList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleSearchMaterials = async (id) => {
    console.log(selectedProvider.provider_name, id);
    try {
      const response = await AxiosGet(`/products/materials/${id}`);
      setMaterialList(response.data);
    } catch (error) {
      message.error("실패");
    }
  };

  // Edit material - Open modal
  const handleEdit = (material) => {
    console.log(material);
  };

  const handleDelete = async (material) => {
    console.log(material);
  };

  const columns = [
    {
      title: "생성일",
      dataIndex: "created_at",
      key: "created_at",

      render: (text, record) => new Date(record.created_at).toLocaleString(),
    },
    {
      title: "상품명",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "상품코드",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "원가",
      dataIndex: "product_sale",
      key: "product_sale",
    },
    {
      title: "동작",
      key: "actions",

      render: (text, record) => (
        <Space>
          <a onClick={() => handleEdit(record)}>수정</a>
          <Popconfirm
            title="상품을  삭제하시겠습니까?"
            onConfirm={() => handleDelete(record.pk)}
          >
            <a>삭제</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space>
          <Searchprovider
            handleSearch={handleSearchMaterials}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            isSelectedProvider={isSelected}
            setisSelectedProvider={setIsSelected}
          />
        </Space>
        <Space>
          <ProductCategory isSelected={isSelected} />
          <Addproduct
            isSelected={isSelected}
            selectedProvider={selectedProvider}
          />
        </Space>
      </Space>

      <Table
        size="small"
        columns={columns}
        dataSource={materialList}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
};

export default Material;
