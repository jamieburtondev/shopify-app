import {
  Modal,
  MediaCard,
  Page,
  Button,
} from "@shopify/polaris";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import CheckAgeRestriction from "../check-age-restriction";
import CapturePayment from "../capture-payment";

import { connect } from "react-redux";
import { addToPickup, removeFromPickup } from "../../store/actions";

const GET_ORDER_DETAILS = gql`
query GetOrderDetails($id: ID!)
{
  order(id: $id) {
    lineItems(first: 10) {
      edges {
        node {
          image {
            originalSrc
          }
          title
          originalTotalSet {
            shopMoney {
              amount
            }
          }
        }
      }
    }
    
  }
}
`;

const OrderDetails = (props) => {
  const { id, closeOrderDetails, addToPickup } = props;
  const { data, loading, error } = useQuery(GET_ORDER_DETAILS, { variables: { id }});

  if (loading) return "";

  if (error) return console.log("error", error);

  return (
    <Modal title="Order Details" open={true} onClose={closeOrderDetails}>
      <Page>
        {data.order.lineItems.edges.map((item, index) => (
          <MediaCard
            key={`${item.node.title}-${index}`}
            title={item.node.title}
            description={`$${
              item.node.originalTotalSet.shopMoney.amount.match(
                /(?<=\.)[\d]+/
              )[0].length === 1
                ? item.node.originalTotalSet.shopMoney.amount + "0"
                : item.node.originalTotalSet.shopMoney.amount
            }`}
          >
            <img
              src={item.node.image ? item.node.image.originalSrc : null}
              alt=""
              width="100px"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </MediaCard>
        ))}
          {props.readyForPickup && (
            <CheckAgeRestriction
              restricted={props.restricted}
              render={(disabled) => (
                <CapturePayment
                  closeOrderDetails={closeOrderDetails}
                  removeFromPickup={props.removeFromPickup}
                  disabled={disabled}
                  id={props.id}
                  parentTransactionId={
                    props.transactions[0] ? props.transactions[0].id : null
                  }
                  amount={props.amount}
                  name={props.name}
                ></CapturePayment>
              )}
            ></CheckAgeRestriction>
          )}

          {props.orderReceived && (
            <Button
              onClick={async () => {
                await closeOrderDetails();
                addToPickup(props.id);
              }}
              primary
            >
              Add to Pickup
            </Button>
          )}
      </Page>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToPickup: (id) => dispatch(addToPickup({ id })),
    removeFromPickup: (id) => dispatch(removeFromPickup({ id })),
  };
};

export default connect(null, mapDispatchToProps)(OrderDetails);
