import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Order from '../order/order';

const GET_ORDERS = location => (gql`
query {
  orders(first: 100, query:"reference_location_id:${location} AND -financial_status:paid") {
    edges {
      node {
        id
        createdAt
        customAttributes {
          key
          value
        }
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        email
        phone
        lineItems(first: 3) {
          edges {
            node {
              title
            }
          }
        }
        transactions(capturable: true, first: 10) {
          id
        }
      }
    }
  }
}
`);

// fulfillment_location_id:56861196486

const Orders = props => {
  const { location } = props;
  const { data, loading, error } = useQuery(GET_ORDERS(location));

  if (loading) return "Loading...";

  if (error) return `${error}`;

  console.log('data.orders.edges', data.orders.edges);

// gid://shopify/OrderTransaction/3757057212614

  return (
    <div>
      <h1> Orders </h1>
      {data.orders.edges.map((order, index) => <Order key={`order-${index}`} node={order.node} index={index} />)}
    </div>
  );
};

export default Orders;