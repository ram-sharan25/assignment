import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Col, Row } from "antd";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";

import { data } from "../data/data";
import DetailView from "./DetailView";
import EntryForm from "./EntryForm";

function ListView() {
  let navigate = useNavigate();
  const columns = [
    {
      title: "Name",
      dataIndex: "CompanyMaster",
      key: "CompanyName",
      render: (item) => item["CompanyName"],
    },
    {
      title: "website",
      dataIndex: "CompanyMaster",
      key: "CompanyWebsite",
      render: (item) => item["CompanyWebsite"],
    },
    {
      title: "phone",
      dataIndex: "CompanyMaster",
      key: "CompanyPhone",
      render: (item) => item["CompanyPhone"],
    },
  ];
  const [value, setValue] = useState("");
  const [companyData, setCompanyData] = React.useState(data);
  const [dataSource, setDataSource] = useState(companyData);

  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div className="ListView">
      <Row>
        <Col span={10}>
          <Input.Search
            placeholder="Input search text"
            value={value}
            onChange={(e) => {
              const currValue = e.target.value;
              setValue(currValue);
              const filteredData = dataSource.filter((entry) =>
                entry.CompanyMaster.CompanyName.toLowerCase().includes(
                  currValue.toLowerCase()
                )
              );
              console.log("filtered Data: ", filteredData);
              setDataSource(filteredData);
            }}
          />
        </Col>
        <Col span={6} offset={8}>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
              className="newCompany"
              block
            >
              <PlusOutlined />
              Add New Company
            </Button>
            <EntryForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        onRow={(r) => ({
          onClick: () => {
            console.log("RAM");
            navigate(`/${r.CompanyMaster.CompanyId}`, {
              state: r,
            });
          },
        })}
        dataSource={dataSource}
        pagination={{
          pageSize: 2,
          total: 50,
        }}
      ></Table>
    </div>
  );
}

export default ListView;
