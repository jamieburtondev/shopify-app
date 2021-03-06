import React from 'react';
import { Modal, MediaCard, Page } from "@shopify/polaris";
import { useQuery } from "@apollo/client";
import { GET_ORDER_DETAILS } from "../../queries";
import PropTypes from "prop-types";

const OrderDetails = ({
  orderId,
  orderTab,
  closeOrderDetails,
}) => {
  const { data, loading, error } = useQuery(GET_ORDER_DETAILS, {
    variables: { id: orderId },
  });

  if (loading || error) return "";

  return (
    <Modal title="Order Details" open={true} onClose={closeOrderDetails}>
      <Page>
        {data.order.lineItems.edges.map((item, index) => {
          const { originalTotalSet, title, image } = item;
          const shopMoneyAmount = originalTotalSet.shopMoney.amount;
          const secondToLastValue = shopMoneyAmount[shopMoneyAmount.length - 2];
          const lastValue = shopMoneyAmount[shopMoneyAmount.length - 1];

          return (
            <MediaCard
              key={`${title}-${index}`}
              title={title}
              description={`$${
                secondToLastValue === "." && typeof lastValue === "number"
                  ? shopMoneyAmount + "0"
                  : shopMoneyAmount
              }`}
            >
              <img
                src={image ? image.originalSrc : null}
                className="media-card-image"
              />
            </MediaCard>
          );
        })}
        {orderTab}
      </Page>
    </Modal>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number,
  orderTab: PropTypes.elementType,
  closeOrderDetails: PropTypes.func,
}

export default OrderDetails;
