import { Button } from "@shopify/polaris";
import CheckAgeRestriction from "../components/check-age-restriction";
import CapturePayment from "../components/capture-payment";

const getOrderTab = ({
  readyForPickup,
  orderReceived,
  name,
  amount,
  transactions,
  restricted,
  id,
  addToPickup,
  removeFromPickup,
  closeOrderDetails
}) => {
  if (readyForPickup) {
    return (
      <CheckAgeRestriction
        restricted={restricted}
        render={(disabled) => (
          <CapturePayment
            closeOrderDetails={closeOrderDetails}
            removeFromPickup={(id) => removeFromPickup(id)}
            disabled={disabled}
            id={id}
            parentTransactionId={transactions[0] ? transactions[0].id : null}
            amount={amount}
            name={name}
          ></CapturePayment>
        )}
      ></CheckAgeRestriction>
    );
  } else if (orderReceived) {
    return (
      <Button
        onClick={async () => {
          await closeOrderDetails();
          addToPickup(id);
        }}
        primary
      >
        Add to Pickup
      </Button>
    );
  }
};

export default getOrderTab;
