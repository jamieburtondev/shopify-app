import React, { Fragment } from "react";
import { Frame, Loading, Layout } from "@shopify/polaris";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../queries";
import getOrders from "../../helpers/getOrders";
import OrderDetails from "../order-details";
import PropTypes from "prop-types";

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

OrderDetails.propTypes = {
  tab: PropTypes.number,
  location: PropTypes.array,
  pickup: PropTypes.string,
};

export default Orders;
