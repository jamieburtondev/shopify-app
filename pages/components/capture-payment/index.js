import { Button } from "@shopify/polaris";
import { Mutation } from "react-apollo";
import { POST_CAPTURE_PAYMENT } from '../../mutations';

const CapturePayment = ({
  id,
  parentTransactionId,
  amount,
  closeOrderDetails,
  removeFromPickup,
  disabled,
  name,
}) => {
  return (
    <Mutation mutation={POST_CAPTURE_PAYMENT}>
      {(capturePayment) => (
        <Button
          primary
          disabled={disabled}
          onClick={async () => {
            await capturePayment({
              variables: { id, parentTransactionId, amount },
            });
            closeOrderDetails();
            removeFromPickup(id);
          }}
        >
          Capture Payment {name}
        </Button>
      )}
    </Mutation>
  );
};

export default CapturePayment;
