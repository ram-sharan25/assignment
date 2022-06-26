import React from "react";
import { useLocation, useParams } from "react-router-dom";

function DetailView(props) {
  const { companyId } = useParams();
  const location = useLocation();

  return (
    <div>
      <div>
        <div>
          <h2>Company Details</h2>
        </div>
        <div>
          <div>
            <h3>Company Name</h3>
          </div>
          <div>{location.state.CompanyMaster.CompanyName}</div>
        </div>
        <div>
          <div>
            <h3>Website</h3>
          </div>
          <div>{location.state.CompanyMaster.CompanyWebsite}</div>
        </div>
        <div>
          <div>
            <h3>Email</h3>
          </div>
          <div>{location.state.CompanyMaster.CompanyEmail}</div>
        </div>
        <div>
          <div>
            <h3>Company Phone Number</h3>
          </div>
          <div>{location.state.CompanyMaster.CompanyPhone}</div>
        </div>
      </div>
      <div>
        {Object.keys(location.state.CompanyAddressList).map((item, index) => (
          <Address item={location.state.CompanyAddressList[item]} id={item} />
        ))}
      </div>
      {/* {JSON.stringify(location.state)} {companyId} */}
    </div>
  );
}
const Address = ({ item, id }) => {
  return (
    <div>
      <div>
        <h1>Address {id} </h1>
      </div>
      <div>
        <div>
          <h3> Office Type</h3>
        </div>
        <div>
          <div>{item.OfficeType}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>Country</h3>
        </div>
        <div>
          <div>{item.Country}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>Address 1 </h3>
        </div>
        <div>
          <div>{item.Address1}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>Address 2</h3>
        </div>
        <div>
          <div>{item.Address2}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>Zip Code</h3>
        </div>
        <div>
          <div>{item.ZipCode}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>State</h3>
        </div>
        <div>
          <div>{item.State}</div>
        </div>
      </div>
      <div>
        <div>
          <h3>Country</h3>
        </div>
        <div>
          <div>{item.Country}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
