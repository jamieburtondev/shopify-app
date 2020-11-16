import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_LOCATIONS = gql`
  query {
    locations(first: 10) {
      edges {
        node {
          address {
            address1
            city
          }
          id
        }
      }
    }
  }
`;

const Locations = () => {
  const { data, loading, error } = useQuery(GET_LOCATIONS);

  if (loading) return "Loading...";

  if (error) return console.log('err', err);

  console.log("locations:", data);

  return (
    <div>
      <h1> Locations: </h1>
      {data.locations.edges.map((location, i) => (
        <div key={`${location}-${i}`}>
          <p> Address: {location.node.address.address1} </p>
          <p> City: {location.node.address.city} </p>
          <p> ID: {location.node.id} </p>
        </div>
      ))}
    </div>
  );
};

export default Locations;
