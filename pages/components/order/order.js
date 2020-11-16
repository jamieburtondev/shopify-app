import { Component } from "react";
import DynamicButton from '../checkAgeRestriction';
import CapturePayment from "../capturePayment";
import moment from "moment";

class Order extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { node } = this.props;
    const timeSinceOrder = moment().diff(moment(node.createdAt), "hours");

    console.log("node.customAttributes", node.customAttributes);

    return (
      <div key={`order-${this.props.index}`}>
        <p> -------- </p>
        {timeSinceOrder > 400 && <b> ALERT: Fulfill Order ASAP! </b>}
        <p> Order ID: {node.id.match(/[\d]+/)[0]} </p>
        <p> Hours Since Creation: {timeSinceOrder} </p>
        {/* <p> Email: {node.email} </p>
        <p> Phone: {node.phone} </p> */}
        <p> Items: </p>
        {node.lineItems.edges.map((item, index) => (
          <span key={`${item.node.title}-${index}`}> {item.node.title} </span>
        ))}
        <p> Amount: {node.totalPriceSet.shopMoney.amount} </p>
        <DynamicButton
          restricted={node.customAttributes.some(
            (attribute) => attribute.key === "ageRestricted"
          )}
          render={
            <CapturePayment
              id={node.id.match(/[\d]+/)[0]}
              parentTransactionId={
                node.transactions[0]
                  ? node.transactions[0].id.match(/[\d]+/)[0]
                  : null
              }
              amount={node.totalPriceSet.shopMoney.amount}
            ></CapturePayment>
          }
        ></DynamicButton>
      </div>
    );
  }
}

export default Order;
