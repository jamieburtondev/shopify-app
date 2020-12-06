import { Fragment } from "react";
import { connect } from "react-redux";
import { Frame, Loading, Layout } from "@shopify/polaris";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Order from "../order";

const GET_ORDERS = (location) => gql`
query {
  orders(first: 10, query:"reference_location_id:${location} AND financial_status:authorized") {
    edges {
      node {
        name
        id
        customer {
          firstName
          lastName
        }
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
        transactions(capturable: true, first: 1) {
          id
        }
      }
    }
  }
}
`;

const Orders = (props) => {
  const { location } = props;
  const { data, loading, error } = useQuery(GET_ORDERS(location));

  if (loading)
    return (
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    );

  if (error) return `${error}`;

  let ordersReceived = [];
  let readyForPickup = [];

  data.orders.edges.map((order, index) => {
    if (props.pickup.includes(order.node.id)) {
      readyForPickup.push(order);
    } else {
      ordersReceived.push(order);
    }
  });

  return (
    <Fragment>
      <Layout>
        {props.tab === 0 &&
          ordersReceived.map((order, index) => (
            <Layout.Section key={`order-received-${index}`}>
              <Order orderReceived={true} node={order.node} index={index} />
            </Layout.Section>
          ))}

        {props.tab === 1 &&
          readyForPickup.map((order, index) => (
            <Layout.Section key={`order-pickup-${index}`}>
              <Order
                name={order.node.name}
                readyForPickup={true}
                node={order.node}
                index={index}
              />
            </Layout.Section>
          ))}
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    pickup: state.pickup,
  };
};

export default connect(mapStateToProps)(Orders);
