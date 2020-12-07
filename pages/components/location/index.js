import { Fragment } from 'react';
import { DisplayText, Heading, Subheading } from "@shopify/polaris";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_LOCATION = gql`
query GetLocation($id: ID!){
  location(id: $id) {
    name
    address {
      address1
      city
      provinceCode
    }
  }
}
`;

const Location = (props) => {
  const { id } = props;
  const { data, loading, error } = useQuery(GET_LOCATION, { variables: { id: `gid://shopify/Location/${id}` }});

  if (loading) return "";

  if (error) return console.log("error", error);

  const { name, address } = data.location

  return (
    <Fragment>
      <DisplayText size="large"> Mobile Ordering </DisplayText>
      <Heading> {name} </Heading>
      <Subheading>
        {address.city}, {address.provinceCode}{" "}
      </Subheading>
    </Fragment>
  );
};

export default Location;
