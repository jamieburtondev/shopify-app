import { Component } from "react";
import {
  Card,
  Heading,
  Banner,
} from "@shopify/polaris";

import OrderDetails from "../order-details";
import moment from "moment";

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = { orderDetails: false };
    this.closeOrderDetails = this.closeOrderDetails.bind(this);
  }

  closeOrderDetails() {
    this.setState({ orderDetails: false });
  }

  render() {
    const { node } = this.props;
    const timeSinceOrder = moment().diff(moment(node.createdAt), "hours");

    return (
      <div>
        {timeSinceOrder > 350 && this.props.orderReceived && (
          <Banner title="Fulfillment Needed" status="critical">
            <p> This order was placed over 350 hours ago. </p>
          </Banner>
        )}
        <Card
          key={`order-${this.props.index}`}
          title={node.customer.firstName + " " + node.customer.lastName}
          primaryFooterAction={{
            content: "View Order",
            onAction: () => this.setState({ orderDetails: true }),
          }}
          footerActionAlignment="left"
        >
          <Card.Section>
            <Heading>
              <p> {timeSinceOrder} Hours Ago </p>
            </Heading>

            {this.state.orderDetails && (
              <OrderDetails
                name={this.props.name}
                orderReceived={this.props.orderReceived}
                readyForPickup={this.props.readyForPickup}
                closeOrderDetails={this.closeOrderDetails}
                id={node.id}
                restricted={node.customAttributes.some(
                  (attribute) => attribute.key === "ageRestricted"
                )}
                transactions={node.transactions}
                amount={node.totalPriceSet.shopMoney.amount}
              />
            )}
          </Card.Section>
        </Card>
      </div>
    );
  }
}

export default Order;
