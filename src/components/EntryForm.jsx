import {
  AutoComplete,
  Cascader,
  Button,
  Col,
  Form,
  Input,
  Row,
  Modal,
  Space,
} from "antd";

import "antd/dist/antd.css";
import { PlusOutlined, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";

const EntryForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();

  const country = [
    {
      value: "usa",
      label: "USA",
    },
    {
      value: "nepal",
      label: "Nepal",
    },
    {
      value: "india",
      label: "India",
    },
    {
      value: "australia",
      label: "Australia",
    },
  ];

  const onAddressFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onNameFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      width={1200}
      height={1400}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            addressForm.validateFields().then((addressValues) => {
              form.resetFields();
              addressForm.resetFields();
              onCreate(values, addressValues);
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onNameFinish}
        layout="vertical"
        scrollToFirstError
      >
        <div>
          <h2>Company Details</h2>
        </div>
        <Row>
          <Col span={5} offset={1}>
            <Form.Item
              name="companyName"
              label="CompanyName"
              rules={[
                {
                  required: true,
                  message: "Please input your company Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5} offset={1}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5} offset={1}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  type: "tel",
                  message: "Please input a valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input size="20" minLength="10" maxLength="14" />
            </Form.Item>
          </Col>
          <Col span={5} offset={1}>
            <Form.Item
              name="website"
              label="Website"
              rules={[
                {
                  type: "url",
                  message: "Please input a valid website!",
                },
                {
                  required: true,
                  message: "Please input a valid website!",
                },
              ]}
            >
              <AutoComplete
                options={websiteOptions}
                onChange={onWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form
        layout="vertical"
        form={addressForm}
        initialValues={{ address: [""] }}
      >
        <Form.List name="address">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Row>
                    <h2>Address {key} </h2>
                    <br></br>
                    <DeleteFilled
                      style={{
                        margin: "9px 20px 0 20px",
                        fontSize: "16px",
                        color: "#e97676",
                      }}
                      onClick={() => remove(name)}
                    />
                    <br />
                    <br />
                  </Row>

                  <Row>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "officeType"]}
                        label="Office Type"
                        rules={[
                          {
                            required: true,
                            message: "Please input Office Type!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "country"]}
                        label="Country"
                        rules={[
                          {
                            type: "array",
                            required: true,
                            message: "Please select the country!",
                          },
                        ]}
                      >
                        <Cascader options={country} />
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "address1"]}
                        label="Address 1"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "address2"]}
                        label="Address2"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "zipcode"]}
                        label="Zip/Postal Code"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "city"]}
                        label="City"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "state"]}
                        label="State"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              ))}
              <Col span={6} offset={0.8}>
                <Form.Item>
                  <Button
                    type="default"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add New Address
                  </Button>
                </Form.Item>
              </Col>
            </>
          )}
        </Form.List>
      </Form>

      {/* <Row>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
    </Modal>
  );
};

export default EntryForm;
