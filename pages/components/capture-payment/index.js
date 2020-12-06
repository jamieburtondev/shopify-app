import { Button } from "@shopify/polaris";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const POST_CAPTURE_PAYMENT = gql`
mutation CapturePayment($id: String!, $parentTransactionId: String!, $amount: String!) {
  orderCapture(input: {id: $id, parentTransactionId: $parentTransactionId, amount: $amount}) {
    transaction {
      id
    }
  }
}
`;

const CapturePayment = (props) => {
  const { id, parentTransactionId, amount, closeOrderDetails, removeFromPickup } = props;

  return (
    <Mutation mutation={POST_CAPTURE_PAYMENT}>
      {capturePayment => (
        <Button
          primary
          onClick={async () => {
            await capturePayment({ variables: { id, parentTransactionId, amount }});
            closeOrderDetails();
            removeFromPickup(id);
          }}
          disabled={props.disabled}
        >
          Capture Payment { props.name }
        </Button>
      )}
    </Mutation>
  );
};

export default CapturePayment;
