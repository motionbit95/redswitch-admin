import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { AxiosPut, AxiosGet } from "../api"; // Assuming AxiosGet is a method to perform GET requests

const BDSMResultTable = () => {
  const [data, setData] = useState([]); // State to manage table data
  const [editingKey, setEditingKey] = useState(""); // Used to track which row is being edited
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [selectedRecord, setSelectedRecord] = useState(null); // Stores the selected record for editing

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call to fetch the list of all results
        const response = await AxiosGet(
          "http://localhost:8080/bdsm/list-all-results"
        );
        setData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures it runs only once on mount

  // Function to show the edit modal with prefilled data
  const showEditModal = (record) => {
    setSelectedRecord(record); // Set the selected record
    form.setFieldsValue({
      tendency: record.tendency,
      description: record.description,
    });
    setVisible(true); // Show the modal
  };

  // Function to handle save action after editing and send data to the server
  const handleEditSave = async () => {
    try {
      const values = await form.validateFields(); // Get the form values
      const updatedRecord = {
        key: selectedRecord.key,
        tendency: values.tendency,
        description: values.description,
      };

      // Call the API endpoint to update the record on the server
      await AxiosPut(
        `http://localhost:8080/bdsm/result-update/${updatedRecord.key}`,
        updatedRecord
      );

      // Update the local state to reflect the changes
      const updatedData = data.map((item) =>
        item.key === updatedRecord.key ? updatedRecord : item
      );
      setData(updatedData); // Update the table data with the new values

      // Close the modal
      setVisible(false);

      // Show a success message
      message.success("수정이 완료되었습니다.");
    } catch (error) {
      console.error("Failed to save:", error);
      message.error("수정 실패. 다시 시도해주세요.");
    }
  };

  const columns = [
    {
      title: "성향",
      dataIndex: "tendency",
      key: "tendency",
    },
    {
      width: 200,
      title: "동작",
      dataIndex: "",
      key: "x",
      render: (_, record) => <a onClick={() => showEditModal(record)}>수정</a>,
    },
  ];

  return (
    <>
      <Table
        pagination={{ showSizeChanger: true }}
        size="small"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {record.description}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data} // Use the state data for the table's dataSource
      />

      <Modal
        title="수정"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleEditSave}
          initialValues={{
            tendency: selectedRecord?.tendency,
            description: selectedRecord?.description,
          }}
        >
          <Form.Item
            name="tendency"
            label="성향"
            rules={[{ required: true, message: "성향을 입력하세요!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="설명"
            rules={[{ required: true, message: "설명을 입력하세요!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BDSMResultTable;
