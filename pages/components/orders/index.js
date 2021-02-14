import { Fragment } from "react";
import { Frame, Loading, Layout } from "@shopify/polaris";
import { useQuery } from "@apollo/react-hooks";
import { GET_ORDERS } from "../../queries";
import getOrders from "../../helpers/getOrders";

const Orders = ({ tab, location, pickup }) => {
  const { data, loading, error } = useQuery(GET_ORDERS(location));

  if (loading)
    return (
      <div className="loading">
        <Frame>
          <Loading />
        </Frame>
      </div>
    );

  if (error) return;

  const ordersForTab = getOrders({
    orders: data.orders.edges,
    pickup,
    tab,
  });

  return (
    <Fragment>
      <Layout>{ordersForTab}</Layout>
    </Fragment>
  );
};

export default Orders;
