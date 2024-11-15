import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { render } from "@testing-library/react";

const strList = [
  "동의",
  "대체적으로 동의",
  "약간 동의",
  "모르겠음",
  "약간 비동의",
  "대체적으로 비동의",
  "비동의",
];
const BDSMTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [expandDataSource, setExpandDataSource] = useState({}); // 객체로 초기화

  useEffect(() => {
    // Fetch questions data using Axios
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bdsm/list-all-questions"
        );
        const questions = response.data;
        console.log(questions);
        setDataSource(
          questions.map((value, index) => ({
            key: index + 1, // 인덱스를 키로 사용
            question: value.question,
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleExpand = async (expanded, record) => {
    if (expanded) {
      try {
        const response = await axios.get(
          `http://localhost:8080/bdsm/get-answers/${record.key}`
        );
        const answers = response.data;
        console.log(answers);

        setExpandDataSource((prev) => ({
          ...prev,
          [record.key]: answers.map((value, index) => ({
            key: index + 1,
            answer: value.step,
            ...value,
          })),
        }));
      } catch (error) {
        console.error(
          `Error fetching answers for question ${record.key}:`,
          error
        );
      }
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
  ];

  const expandColumns = [
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => <span>{strList[text - 1]}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          마스터/
          <br />
          미스트레스
        </div>
      ),
      dataIndex: "master_mistress_",
      key: "master_mistress_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          슬레이브
        </div>
      ),
      dataIndex: "slave_",
      key: "slave_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          헌터
        </div>
      ),
      dataIndex: "hunter_",
      key: "hunter_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          프레이
        </div>
      ),
      dataIndex: "prey_",
      key: "prey_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          브랫테이머
        </div>
      ),
      dataIndex: "brat_tamer_",
      key: "brat_tamer_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          브랫
        </div>
      ),
      dataIndex: "brat_",
      key: "brat_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          오너
        </div>
      ),
      dataIndex: "owner_",
      key: "owner_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          펫
        </div>
      ),
      dataIndex: "pet_",
      key: "pet_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          대디/마미
        </div>
      ),
      dataIndex: "daddy_mommy_",
      key: "daddy_mommy_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          리틀
        </div>
      ),
      dataIndex: "little_",
      key: "little_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          사디스트
        </div>
      ),
      dataIndex: "sadist_",
      key: "sadist_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          마조히스트
        </div>
      ),
      dataIndex: "masochist_",
      key: "masochist_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          스팽커
        </div>
      ),
      dataIndex: "spanker_",
      key: "spanker_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          스팽키
        </div>
      ),
      dataIndex: "spankee_",
      key: "spankee_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          디그레이더
        </div>
      ),
      dataIndex: "degrader_",
      key: "degrader_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          디그레이디
        </div>
      ),
      dataIndex: "degradee_",
      key: "degradee_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          리거
        </div>
      ),
      dataIndex: "rigger_",
      key: "rigger_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          로프버니
        </div>
      ),
      dataIndex: "rope_bunny_",
      key: "rope_bunny_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          도미넌트
        </div>
      ),
      dataIndex: "dominant_",
      key: "dominant_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          서브미시브
        </div>
      ),
      dataIndex: "submissive_",
      key: "submissive_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          스위치
        </div>
      ),
      dataIndex: "switch_",
      key: "switch_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
    {
      title: (
        <div style={{ writingMode: "vertical-lr", textAlign: "center" }}>
          바닐라
        </div>
      ),
      dataIndex: "vanilla_",
      key: "vanilla_",
      render: (text) => <span>{text === 0 ? "" : text}</span>,
    },
  ];

  const expandedRowRender = (record) => (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table
        columns={expandColumns}
        dataSource={expandDataSource[record.key] || []} // 배열이 없으면 빈 배열
        pagination={false} // 하위 테이블에 페이지네이션 없음
        scroll={{ x: "max-content" }} // 하위 테이블에만 가로 스크롤 적용
        style={{ width: "100%" }} // 하위 테이블의 width 설정
        size="small"
      />
    </div>
  );

  return (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          onExpand: handleExpand,
        }}
        dataSource={dataSource}
        scroll={{ x: "max-content" }} // 부모 테이블에 스크롤 적용 안함 (필요시 추가 가능)
      />
    </div>
  );
};

export default BDSMTable;
