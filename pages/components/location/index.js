import React from 'react';
import { DisplayText, Subheading } from "@shopify/polaris";
import { GET_LOCATION } from '../../queries'
import { useQuery } from "@apollo/client";
import PropTypes from 'prop-types';

const Location = ({ id }) => {
  const { data, loading, error } = useQuery(GET_LOCATION, {
    variables: { id: `gid://shopify/Location/${id}` },
  });

  if (loading || error) return "";

  const { name, address } = data.location;

  return (
    <div className="store-header-left">
      <DisplayText size="large">
        {name ? name : "Mobile Ordering"}
      </DisplayText>
      <div className="small-spacing">
        <Subheading>
          {address.city}, {address.provinceCode}
        </Subheading>
      </div>
    </div>
  );
};

Location.propTypes = {
  id: PropTypes.number
}

export default Location;
