import React, { useState } from "react";
import { Card, Heading, Banner } from "@shopify/polaris";
import OrderDetails from "../../containers/order-details";
import getOrderTab from "../../helpers/getOrderTab";
import moment from "moment";
import PropTypes from "prop-types";

const Order = ({
  order: {
    node: {
      customer: { firstName: customerFirstName, lastName: customerLastName },
      createdAt: orderCreatedAt,
      id: orderId,
    },
  },
  orderReceived,
  readyForPickup,
  orderListNumber,
  addToPickup,
  removeFromPickup,
}) => {
  const [orderDetails, useOrderDetails] = useState(false);
  const closeOrderDetails = () => useOrderDetails(false);
  const timeSinceOrder = moment().diff(moment(orderCreatedAt), "hours");

  const orderTab = getOrderTab({
    addToPickup,
    removeFromPickup,
    readyForPickup,
    orderReceived,
    name: order.node.name,
    amount: order.node.totalPriceSet.shopMoney.amount,
    transactions: order.node.transactions,
    id: order.node.id,
    restricted: order.node.customAttributes.some(
      (attribute) => attribute.key === "ageRestricted"
    ),
    closeOrderDetails,
  });

  return (
    <div>
      {timeSinceOrder > 350 && orderReceived && (
        <Banner title="Fulfillment Needed" status="critical">
          <p> This order was placed over 350 hours ago. </p>
        </Banner>
      )}
      <Card
        key={`order-${orderListNumber}`}
        title={`${customerFirstName} ${customerLastName}`}
        primaryFooterAction={{
          content: "View Order",
          onAction: () => useOrderDetails(true),
        }}
        footerActionAlignment="left"
      >
        <Card.Section>
          <Heading>
            <p> {timeSinceOrder} Hours Ago </p>
          </Heading>

          {orderDetails && (
            <OrderDetails
              orderTab={orderTab}
              orderId={orderId}
              closeOrderDetails={closeOrderDetails}
            />
          )}
        </Card.Section>
      </Card>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.object,
  orderReceived: PropTypes.func,
  readyForPickup: PropTypes.func,
  orderListNumber: PropTypes.string,
  addToPickup: PropTypes.func,
  removeFromPickup: PropTypes.func,
};

export default Order;
