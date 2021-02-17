import React from 'react';
import { Button } from "@shopify/polaris";
import { useMutation } from "@apollo/client";
import { POST_CAPTURE_PAYMENT } from "../../mutations";
import PropTypes from 'prop-types';

const CapturePayment = ({
  id,
  parentTransactionId,
  amount,
  closeOrderDetails,
  removeFromPickup,
  disabled,
  name,
}) => {
  const [mutate, { loading, error, data }] = useMutation(POST_CAPTURE_PAYMENT);

  if (loading || error) return;

  return (
    <Button
      primary
      disabled={disabled}
      onClick={() => {
        mutate({
          variables: { id, parentTransactionId, amount },
        });
        closeOrderDetails();
        removeFromPickup(id);
      }}
    >
      Capture Payment {name}
    </Button>
  );
};

CapturePayment.propTypes = {
  id: PropTypes.number,
  parentTransactionId: PropTypes.number,
  amount: PropTypes.number,
  closeOrderDetails: PropTypes.func,
  removeFromPickup: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default CapturePayment;
