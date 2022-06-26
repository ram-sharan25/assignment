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
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const EntryForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

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

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

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
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="dynamic_form_nest_item"
        // onFinish={onFinish}
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
                {
                  pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                  message: "Please match the following pattern 999-999-9999!",
                },
              ]}
            >
              <Input size="20" minlength="9" maxlength="14" />
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
        <h2>Address </h2>
        <div>
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    <br />
                    <br />
                    <Row>
                      <Col span={5} offset={1}>
                        <Form.Item
                          {...restField}
                          name="officeType"
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
                          name="country"
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
                        <Form.Item {...restField} name="address1" label="Address 1">
                          <Input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={5} offset={1}>
                        <Form.Item {...restField} name="address2" label="Address2">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={5} offset={1}>
                        <Form.Item {...restField} name="zipPostalCode" label="Zip/Postal Code">
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={5} offset={1}>
                        <Form.Item {...restField} name="city" label="City">
                          <Input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={5} offset={1}>
                        <Form.Item {...restField} name="state" label="State">
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
        </div>

        {/* <Row>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </Modal>
  );
};

export default EntryForm;
