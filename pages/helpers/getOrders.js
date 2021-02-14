import { Layout } from "@shopify/polaris";
import Order from '../containers/order';

const getOrders = ({ orders, pickup, tab }) => {
  const ordersReceived = [];
  const readyForPickup = [];

  orders.map((order) =>
    pickup.includes(order.node.id)
      ? readyForPickup.push(order)
      : ordersReceived.push(order)
  );

  return getJSX({ tab, readyForPickup, ordersReceived });
};

const getJSX = ({ tab, readyForPickup, ordersReceived }) => {
  switch (tab) {
    case 0:
      return ordersReceived.map((order, index) => (
        <Layout.Section key={`order-received-${index}`}>
          <Order
            order={order}
            orderReceived={true}
            node={order.node}
            orderListNumber={index}
          />
        </Layout.Section>
      ));
    case 1:
      return readyForPickup.map((order, index) => (
        <Layout.Section key={`order-pickup-${index}`}>
          <Order
            order={order}
            readyForPickup={true}
            node={order.node}
            orderListNumber={index}
          />
        </Layout.Section>
      ));
    default:
      break;
  }
};

export default getOrders;
