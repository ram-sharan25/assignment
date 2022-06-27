import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";

function DetailView(props) {
  const location = useLocation();

  return (
    <div>
      <h2>Company Details</h2>
      <Row>
        <Col span={5} offset={1}>
          <p>Company Name:</p>
          <h3> {location.state.CompanyMaster.CompanyName}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Website:</p>
          <h3>{location.state.CompanyMaster.CompanyWebsite}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Email:</p>
          <h3>{location.state.CompanyMaster.CompanyEmail}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Phone Number:</p>
          <h3>{location.state.CompanyMaster.CompanyPhone}</h3>
        </Col>
      </Row>
      <div>
        {Object.keys(location.state.CompanyAddressList).map((item, index) => (
          <Address
            key={index}
            item={location.state.CompanyAddressList[item]}
            id={item}
          />
        ))}
      </div>

      {/* {JSON.stringify(location.state)} {companyId} */}
    </div>
  );
}
const Address = ({ item, id }) => {
  return (
    <div>
      <h2>Address {~~id + 1} </h2>
      <Row>
        <Col span={5} offset={1}>
          <p> Office Type:</p>
          <h3>{item.OfficeType}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Country:</p>
          <h3>{item.Country}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Address 1:</p>
          <h3>{item.Address1}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Address 2:</p>
          <h3>{item.Address2}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>Zip Code:</p>
          <h3>{item.ZipCode}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>State:</p>
          <h3>{item.State}</h3>
        </Col>

        <Col span={5} offset={1}>
          <p>City:</p>
          <h3>{item.City}</h3>
        </Col>
      </Row>
    </div>
  );
};

export default DetailView;
