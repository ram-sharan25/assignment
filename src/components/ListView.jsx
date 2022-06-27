import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Col, Row, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  DeleteFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { data } from "../data/data";

import EntryForm from "./EntryForm";

function ListView() {
  let navigate = useNavigate();

  const handleMenuClick = (e, item) => {
    console.log(e, item);
    if (e.key === "0") {
      navigate(`/${item.CompanyMaster.CompanyId}`, {
        state: item,
      });
    } else if (e.key === "1") {
      var filtered = dataSource.filter(
        (data) => data.CompanyMaster.CompanyId !== item.CompanyMaster.CompanyId
      );
      console.log(filtered);
      setDataSource(filtered);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "CompanyMaster",
      key: (item) => item["CompanyName"],
      render: (item) => item["CompanyName"],
    },
    {
      title: "website",
      dataIndex: "CompanyMaster",
      key: (item) => item["CompanyWebsite"],
      render: (item) => item["CompanyWebsite"],
    },
    {
      title: "Phone Number",
      dataIndex: "CompanyMaster",
      key: (item) => item["CompanyPhone"],
      render: (item) => item["CompanyPhone"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <Dropdown
          overlay={
            <Menu
              onClick={(e) => handleMenuClick(e, item)}
              items={[
                {
                  label: (
                    <>
                      View <EyeOutlined />
                    </>
                  ),
                  key: "0",
                },
                {
                  label: (
                    <>
                      Delete <DeleteFilled />
                    </>
                  ),
                  key: "1",
                },
                {
                  label: (
                    <>
                      Approve <CheckCircleOutlined />
                    </>
                  ),
                  key: "2",
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <a style={{ padding: "10px" }} onMouseUp={(e) => e.preventDefault()}>
            <MoreOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(
    JSON.parse(localStorage.getItem("dataSource")) || []
  );

  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if (value.length === 0)
      localStorage.setItem("dataSource", JSON.stringify(dataSource));
  }, [dataSource]);

  useEffect(() => {
    var items = localStorage.getItem("dataSource");

    if (items == null || JSON.parse(items).length === 0) {
      localStorage.setItem("dataSource", JSON.stringify(data));
    }
  }, []);

  const onCreate = (values, addressValues) => {
    setVisible(false);
    var CompanyAddress = {};

    for (var i = 0; i < addressValues.address.length; i++) {
      CompanyAddress[`${i}`] = {
        OfficeType: addressValues.address[i].officeType,
        Country: addressValues.address[i].country,
        Address1: addressValues.address[i].address1,
        Address2: addressValues.address[i].address2,
        ZipCode: addressValues.address[i].zipcode,
        City: addressValues.address[i].city,
        State: addressValues.address[i].state,
        CompanyId: Math.floor(Math.random() * 100),
        CompanyAddressId: Math.floor(Math.random() * 100),
        IsActive: true,
        CreatedDate: new Date(),
      };
    }

    var newObj = {
      CompanyMaster: {
        CompanyTypeId: 1,
        CompanyCode: "ING-00" + Math.floor(Math.random() * 100),
        CompanyName: values.companyName,
        CompanyWebsite: values.website,
        CompanyEmail: values.email,
        CompanyPhone: values.phone,
        IsActive: true,
        CompanyId: Math.floor(Math.random() * 100),
        CreatedDate: new Date(),
      },
      CompanyAddressList: CompanyAddress,
    };

    setDataSource((prev) => [...prev, newObj]);
  };
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="ListView">
      <h2>Company Name:</h2>
      <Row>
        <Col span={8} offset={0.25}>
          <Input.Search
            style={{ padding: "15px 10px 20px 0px", borderRadius: "10%" }}
            allowClear
            placeholder="Input Company Name"
            enterButton="Search"
            value={value}
            suffix={suffix}
            onChange={(e) => {
              const currValue = e.target.value;
              setValue(currValue);
              if (currValue.length > 0) {
                const filteredData = JSON.parse(
                  localStorage.getItem("dataSource")
                ).filter((entry) =>
                  entry.CompanyMaster.CompanyName.toLowerCase().includes(
                    currValue.toLowerCase()
                  )
                );
                setDataSource(filteredData);
              } else {
                setDataSource(JSON.parse(localStorage.getItem("dataSource")));
              }
            }}
          />
        </Col>
        <Col span={5} offset={11}>
          <div style={{ padding: "15px 10px 20px 0px" }}>
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
        rowSelection={rowSelection}
        rowKey={(record) => record["CompanyMaster"]["CompanyId"]}
        onRow={(record) => ({
          // onClick: () => {
          //   navigate(`/${record.CompanyMaster.CompanyId}`, {
          //     state: record,
          //   });
          // },
        })}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          total: dataSource.length,
        }}
      ></Table>
    </div>
  );
}

export default ListView;
